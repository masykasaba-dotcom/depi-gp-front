import { Link, useParams, useLocation } from "react-router";
import useOrderDetials from "../hooks/useOrderDetials";
import useAddresses from "../hooks/useAddresses";
import useGetProfileData from "../hooks/useGetProfileData";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmed() {
  const { id } = useParams();
  const location = useLocation();
  const { isError, isLoading, orderDetails } = useOrderDetials();
  const { addresses } = useAddresses();
  const { profileData } = useGetProfileData();
  
  const shippingState = location.state?.shippingDetails;
  const paymentState = location.state?.paymentMethod;

  const defaultAddr = addresses?.find(a => a.is_default) || addresses?.[0];
  
  const firstName = shippingState?.firstName || profileData?.first_name || "";
  const lastName = shippingState?.lastName || profileData?.last_name || "";
  const streetAddress = shippingState?.streetAddress || defaultAddr?.street_address || "";
  const city = shippingState?.city || defaultAddr?.city || "";
  const stateStr = shippingState?.state || defaultAddr?.state || "CA";
  const zipCode = shippingState?.zipCode || defaultAddr?.zip_code || "";
  const paymentText = paymentState === "card" ? "Credit Card" : (orderDetails?.payment?.status === "cash" ? "Cash on Delivery" : "Cash on Delivery");

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-[#EAEAEA] rounded-full mb-6"></div>
          <div className="h-8 w-48 bg-[#EAEAEA] rounded mb-2"></div>
          <div className="h-4 w-64 bg-[#EAEAEA] rounded mb-8"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Could not load order confirmation.</p>
          <Link to="/orders" className="text-[#06373A] hover:underline">
            Go to your orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F6] min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#032b26] rounded-full flex items-center justify-center text-white mb-6">
            <CheckCircle size={32} strokeWidth={2.5} />
          </div>
          <h1 className="font-display-lg text-[40px] text-[#06373A] leading-tight mb-3">
            Order Confirmed.
          </h1>
          <p className="font-body-md text-[14px] text-[#555a5b] mb-6">
            Thank you for your purchase. We are preparing your order for shipment.
          </p>
          <div className="bg-[#E8EFF0] text-[#06373A] text-[11px] font-bold tracking-widest uppercase px-6 py-2 rounded-full border border-[#dce6e7]">
            ORDER NO. {orderDetails?.order_ref || orderDetails?.order_id}
          </div>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm h-fit">
            <h2 className="font-display-lg text-[20px] text-[#06373A] border-b border-[#E8E4DE]/50 pb-4 mb-6">
              Order Summary
            </h2>
            
            {/* Items */}
            <div className="space-y-6 border-b border-[#E8E4DE]/50 pb-6 mb-6">
              {orderDetails?.items?.map((item) => (
                <div key={item.order_item_id} className="flex gap-4">
                  <div className="w-20 h-20 bg-[#F5F5F5] rounded-xl overflow-hidden shrink-0 border border-[#E8E4DE]">
                    <img 
                      src={item.variant?.product?.images?.[0]?.image_url || item.variant?.product?.image_url || item.variant?.image_url || "https://placehold.co/100x100?text=Product"} 
                      alt={item.variant?.product?.product_name || "Product Image"}
                      className="w-full h-full object-cover mix-blend-multiply"
                      onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Product"; }}
                    />
                  </div>
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-display-lg text-[15px] font-semibold text-[#06373A] leading-snug">
                          {item.variant?.product?.product_name}
                        </h3>
                        <p className="text-[12px] text-[#555a5b] mt-1">
                          {item.variant?.size || "Standard"}
                        </p>
                      </div>
                      <p className="text-[14px] font-semibold text-[#06373A]">
                        ${Number(item.price_at_purchase).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-[12px] text-[#555a5b]">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Summary */}
            <div className="space-y-3 font-body-md text-[13px] text-[#555a5b]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#06373A]">${Number(orderDetails?.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping (Standard)</span>
                <span className="font-semibold text-[#06373A]">${Number(orderDetails?.shipping).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-semibold text-[#06373A]">${Number(orderDetails?.tax).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between pt-4 mt-2 border-t border-[#E8E4DE] items-center">
                <span className="font-bold tracking-widest uppercase text-[11px] text-[#06373A]">Total</span>
                <span className="font-display-lg text-[18px] font-semibold text-[#06373A]">
                  ${Number(orderDetails?.total).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Details Box */}
            <div className="bg-[#FAF9F6]/50 rounded-2xl border border-[#E8E4DE] shadow-sm divide-y divide-[#E8E4DE]">
              
              <div className="p-5">
                <h3 className="text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-3 flex items-center gap-2">
                  🚚 Delivery Details
                </h3>
                <p className="text-[11px] text-[#555a5b] mb-1">Estimated Arrival</p>
                <p className="text-[13px] font-semibold text-[#06373A]">
                  {/* Just mock an estimated arrival date 5 days from created_at */}
                  {new Date(new Date(orderDetails?.created_at || Date.now()).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div className="p-5">
                <h3 className="text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-3 flex items-center gap-2">
                  📍 Shipping Address
                </h3>
                <p className="text-[13px] font-semibold text-[#06373A] mb-1">
                  {firstName} {lastName}
                </p>
                <p className="text-[13px] text-[#555a5b] leading-relaxed">
                  {streetAddress}<br/>
                  {city}{city && ","} {stateStr} {zipCode}<br/>
                  United States
                </p>
              </div>

              <div className="p-5">
                <h3 className="text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-3 flex items-center gap-2">
                  💳 Payment Method
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gray-200 rounded shrink-0"></div>
                  <p className="text-[13px] text-[#06373A]">
                    {paymentText}
                  </p>
                </div>
              </div>

            </div>

            {/* Action Box */}
            <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 shadow-sm text-center">
              <p className="text-[12px] text-[#555a5b] mb-4">
                Save your details for faster checkout next time.
              </p>
              <div className="space-y-3">
                <Link to="/profile" className="block w-full bg-[#032b26] text-white text-[12px] font-semibold tracking-widest uppercase py-3.5 rounded-xl hover:bg-[#06373A] transition-colors shadow-sm">
                  Save Details
                </Link>
                <Link to="/products" className="block w-full bg-white text-[#06373A] text-[12px] font-semibold tracking-widest uppercase py-3.5 rounded-xl border border-[#E8E4DE] hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
