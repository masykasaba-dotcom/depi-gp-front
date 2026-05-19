import { useState, use, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import useAddresses from "../hooks/useAddresses";
import useGetProfileData from "../hooks/useGetProfileData";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_placeholder");

function CheckoutContent() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartProducts, totalPrice, setCartProducts } = use(CartContext);
  const { token } = use(AuthContext);
  const { addresses, handleAddAddress } = useAddresses();
  const { profileData } = useGetProfileData();
  const navigate = useNavigate();

  // Contact info state
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  // Address selection state
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "CA",
    zipCode: "",
    phone: ""
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash', 'card'

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discountAmount }
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Loading / Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fill in email & name from profileData when loaded
  useEffect(() => {
    if (profileData) {
      setEmail(profileData.email || "");
      setShippingDetails(prev => ({
        ...prev,
        firstName: profileData.first_name || "",
        lastName: profileData.last_name || "",
        phone: profileData.phone || ""
      }));
    }
  }, [profileData]);

  // Set default address when addresses load
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
      setSelectedAddressId(defaultAddr.address_id);
      fillAddressFields(defaultAddr);
    }
  }, [addresses]);

  function fillAddressFields(addr) {
    if (!addr) return;
    setShippingDetails(prev => ({
      ...prev,
      streetAddress: addr.street_address || "",
      city: addr.city || "",
      state: addr.state || "CA",
      zipCode: addr.zip_code || "",
      phone: addr.phone || prev.phone
    }));
  }

  // Handle Saved Address Dropdown change
  function handleAddressSelectChange(e) {
    const id = e.target.value;
    setSelectedAddressId(id);
    if (id === "new") {
      setShippingDetails(prev => ({
        ...prev,
        streetAddress: "",
        apartment: "",
        city: "",
        state: "CA",
        zipCode: "",
        phone: profileData?.phone || ""
      }));
    } else {
      const found = addresses.find(a => a.address_id === parseInt(id));
      if (found) {
        fillAddressFields(found);
      }
    }
  }

  // Calculate order totals
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const isFreeShipping = totalPrice >= 150;
  const shippingCost = isFreeShipping ? 0 : 15;
  const taxes = parseFloat((totalPrice * 0.08).toFixed(2));
  const finalTotal = parseFloat((totalPrice + shippingCost + taxes - discountAmount).toFixed(2));

  // Apply Coupon Call
  async function handleApplyCoupon(e) {
    e.preventDefault();
    if (!couponCode) return;

    setIsApplyingCoupon(true);
    try {
      const res = await axios.post(
        `${apiUrl}coupons/validate`,
        { code: couponCode, cart_total: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const discount = res.data?.discount_amount || 20; // fallback if body structure varies
      setAppliedCoupon({
        code: couponCode,
        discountAmount: discount
      });
      toast.success(`Coupon "${couponCode}" applied successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid coupon code");
    } finally {
      setIsApplyingCoupon(false);
    }
  }

  // Form Submission
  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (cartProducts.length === 0) return;

    setIsSubmitting(true);
    try {
      let finalAddressId = selectedAddressId;

      // 1. If 'new address' selected, save address first
      if (selectedAddressId === "new" || !selectedAddressId) {
        const res = await axios.post(
          `${apiUrl}addresses`,
          {
            street_address: shippingDetails.streetAddress,
            city: shippingDetails.city,
            state: shippingDetails.state,
            country: "Egypt",
            zip_code: shippingDetails.zipCode,
            phone: shippingDetails.phone,
            is_default: false
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        finalAddressId = res.data?.data?.address_id || res.data?.address_id;
      }

      if (!finalAddressId) {
        throw new Error("Delivery address is required.");
      }

      // 2. Post the Order
      const orderRes = await axios.post(
        `${apiUrl}orders`,
        {
          address_id: parseInt(finalAddressId),
          coupon_code: appliedCoupon ? appliedCoupon.code : undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2.5. Stripe Payment Intent & Confirmation
      if (paymentMethod === "card") {
        if (!stripe || !elements) {
          throw new Error("Stripe has not loaded correctly.");
        }

        const orderId = orderRes.data?.data?.order_id || orderRes.data?.order_id;
        if (!orderId) throw new Error("Order ID missing from response");
        
        // Call backend to create payment intent
        const intentRes = await axios.post(
          `${apiUrl}payment/create-intent`,
          { order_id: orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const clientSecret = intentRes.data?.data?.clientSecret || intentRes.data?.clientSecret;
        if (!clientSecret) throw new Error("Failed to initialize payment");

        const cardElement = elements.getElement(CardElement);
        
        // Confirm payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
              email: email,
              phone: shippingDetails.phone,
              address: {
                line1: shippingDetails.streetAddress,
                city: shippingDetails.city,
                state: shippingDetails.state,
                postal_code: shippingDetails.zipCode,
                country: "EG",
              }
            }
          }
        });

        if (error) {
          throw new Error(error.message);
        }
      }

      // 3. Clear Cart & redirect to orders
      setCartProducts([]);
      toast.success("Order placed successfully!");
      
      const redirectOrderId = orderRes.data?.order?.order_id || orderRes.data?.data?.order_id || orderRes.data?.order_id;
      if (redirectOrderId) {
        navigate(`/order-confirmed/${redirectOrderId}`, {
          state: {
            shippingDetails,
            paymentMethod
          }
        });
      } else {
        navigate("/orders");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Failed to process order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Redirect if cart empty
  if (cartProducts.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center py-24 px-6 text-center">
        <h2 className="font-display-lg text-[24px] text-[#06373A] mb-3">Your Bag is empty</h2>
        <p className="font-body-md text-[14px] text-on-secondary-container mb-8">
          Add items to your bag before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="px-6 py-3.5 bg-[#032b26] text-white hover:bg-[#06373A] text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors shadow-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F6] min-h-screen py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Navigation / Header */}
        <header className="flex items-center justify-between gap-4 border-b border-[#E8E4DE] pb-6 mb-12">
          <div>
            <h1 className="font-display-lg text-[28px] md:text-[36px] text-[#06373A] leading-tight mb-1">
              Secure Checkout
            </h1>
            <p className="font-body-md text-[13px] text-on-secondary-container">
              Complete your order below.
            </p>
          </div>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06373A] hover:underline underline-offset-4"
          >
            <ArrowLeft size={14} />
            <span>Return to Cart</span>
          </Link>
        </header>

        {/* 2-Column Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display-lg text-[16px] font-semibold text-[#06373A] mb-6 flex items-center gap-2">
                👤 Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                  />
                </div>
                <label className="flex items-center gap-3 text-xs text-on-secondary-container cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="rounded text-[#06373A] focus:ring-[#06373A] border-outline-variant"
                  />
                  <span>Keep me up to date on news and exclusive offers</span>
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display-lg text-[16px] font-semibold text-[#06373A] mb-6 flex items-center gap-2">
                🚚 Shipping Address
              </h3>

              {/* Saved Address Selector */}
              {addresses && addresses.length > 0 && (
                <div className="mb-6 pb-6 border-b border-[#E8E4DE]/50">
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    Use Saved Address
                  </label>
                  <select
                    value={selectedAddressId}
                    onChange={handleAddressSelectChange}
                    className="w-full h-10 px-3 border border-[#E8E4DE] rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all font-body-md"
                  >
                    {addresses.map(addr => (
                      <option key={addr.address_id} value={addr.address_id}>
                        {addr.street_address}, {addr.city} {addr.is_default ? "(Default)" : ""}
                      </option>
                    ))}
                    <option value="new">+ Add New Shipping Address</option>
                  </select>
                </div>
              )}

              {/* Address Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Eleanor"
                      value={shippingDetails.firstName}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Vance"
                      value={shippingDetails.lastName}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="123 Serenity Lane"
                    value={shippingDetails.streetAddress}
                    onChange={(e) => setShippingDetails(prev => ({ ...prev, streetAddress: e.target.value }))}
                    className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Apt 4B"
                    value={shippingDetails.apartment}
                    onChange={(e) => setShippingDetails(prev => ({ ...prev, apartment: e.target.value }))}
                    className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="San Francisco"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                      State
                    </label>
                    <select
                      value={shippingDetails.state}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    >
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="EG">Cairo (Egypt)</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="94105"
                      value={shippingDetails.zipCode}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2837"
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display-lg text-[16px] font-semibold text-[#06373A] mb-2 flex items-center gap-2">
                💳 Payment
              </h3>
              <p className="font-body-md text-[11px] text-on-secondary-container mb-6">
                All transactions are secure and encrypted.
              </p>

              {/* Accordion list */}
              <div className="border border-[#E8E4DE] rounded-xl overflow-hidden divide-y divide-[#E8E4DE]">
                
                {/* Cash on Delivery Tab */}
                <div className={`p-4 transition-colors ${paymentMethod === "cash" ? "bg-[#FAF9F6]" : "bg-white"}`}>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="radio"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="text-[#06373A] focus:ring-[#06373A]"
                    />
                    <span className="font-display-lg text-[13px] font-semibold text-[#06373A]">
                      Cash on Delivery
                    </span>
                  </label>
                  {paymentMethod === "cash" && (
                    <div className="mt-4 pt-4 border-t border-[#E8E4DE]/50 animate-fade-in-up">
                      <p className="text-[12px] text-[#555a5b]">
                        Pay with cash upon delivery.
                      </p>
                    </div>
                  )}
                </div>

                {/* Credit Card Tab */}
                <div className={`p-4 transition-colors ${paymentMethod === "card" ? "bg-[#FAF9F6]" : "bg-white"}`}>
                  <label className="flex items-center justify-between cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-[#06373A] focus:ring-[#06373A]"
                      />
                      <span className="font-display-lg text-[13px] font-semibold text-[#06373A]">
                        Credit Card
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-60 text-xs">
                      💳
                    </div>
                  </label>

                  {paymentMethod === "card" && (
                    <div className="mt-4 pt-4 border-t border-[#E8E4DE]/50 space-y-4 animate-fade-in-up">
                      <div className="w-full p-4 border border-outline-variant/50 rounded-lg bg-white">
                        <CardElement 
                          options={{
                            style: {
                              base: {
                                fontSize: '14px',
                                color: '#06373A',
                                '::placeholder': {
                                  color: '#aab7c4',
                                },
                              },
                              invalid: {
                                color: '#9e2146',
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Placement */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
              <h3 className="font-display-lg text-[16px] font-semibold text-[#06373A] mb-6 flex items-center gap-2">
                🛍️ Order Summary
              </h3>

              {/* Products list inside Order Summary */}
              <div className="space-y-4 mb-6 max-h-[220px] overflow-y-auto pr-1">
                {cartProducts.map((item) => (
                  <div key={item.cart_item_id} className="flex gap-4 items-center justify-between font-body-md text-[13px]">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-12 h-12 bg-[#FAF9F6] border border-[#E8E4DE] rounded-[4px] flex items-center justify-center p-1 relative shrink-0">
                        <img src={item.primary_image} alt={item.product_name} className="h-full object-contain mix-blend-multiply" />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#06373A] text-white text-[9px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#06373A] truncate leading-tight">
                          {item.product_name}
                        </p>
                        <p className="text-[10px] text-on-secondary-container mt-0.5">
                          {item.variant_size}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#06373A] shrink-0 tabular-nums">
                      ${item.item_total}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon / Discount Code input */}
              <div className="flex gap-2 mb-6 pb-6 border-b border-[#E8E4DE]/50">
                <input
                  type="text"
                  placeholder="Gift card or discount code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode || isApplyingCoupon}
                  className="h-10 px-5 bg-[#555a5b] text-white hover:bg-[#06373A] disabled:bg-gray-100 disabled:text-gray-300 font-semibold text-xs rounded-lg uppercase tracking-wider transition-all"
                >
                  {isApplyingCoupon ? "..." : "Apply"}
                </button>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 font-body-md text-[13px] text-on-secondary-container mb-6">
                <div className="flex justify-between">
                  <span className="text-[#555a5b]">Subtotal</span>
                  <span className="font-semibold text-[#06373A] tabular-nums">${totalPrice}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="tabular-nums">-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#555a5b]">Shipping</span>
                  <span className="font-semibold text-[#06373A]">
                    {isFreeShipping ? "Free" : `$${shippingCost}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#555a5b]">Taxes</span>
                  <span className="font-semibold text-[#06373A] tabular-nums">${taxes}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E8E4DE] my-6" />

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="font-display-lg text-[16px] text-[#06373A] leading-none">Total</span>
                <span className="font-display-lg text-[22px] text-[#06373A] leading-none tracking-tight tabular-nums flex items-baseline gap-1">
                  <span className="text-[12px] font-semibold text-on-secondary-container normal-case tracking-normal">USD</span>
                  ${finalTotal}
                </span>
              </div>

              {/* Place Order submit */}
              <button
                type="submit"
                disabled={isSubmitting || (paymentMethod === "card" && !stripe)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-lg text-xs font-semibold uppercase tracking-widest bg-[#032b26] text-white hover:bg-[#06373A] disabled:bg-gray-100 disabled:text-gray-400 transition-colors shadow-sm cursor-pointer"
              >
                <Lock size={13} className="mr-1" />
                <span>{isSubmitting ? "Processing..." : "Place Order"}</span>
              </button>

              <p className="mt-4 text-[10px] leading-relaxed text-on-secondary-container text-center">
                By placing your order, you agree to our{" "}
                <Link to="/cms/terms" className="underline hover:text-[#06373A]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/cms/privacy_policy" className="underline hover:text-[#06373A]">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  );
}
