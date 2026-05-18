import React from "react";
import { Link } from "react-router";
import useTrackingOrder from "../hooks/useTrackingOrder";
import useOrderDetials from "../hooks/useOrderDetials";

export default function TrackingOrder() {
  const { isError: isTrackError, isLoading: isTrackLoading, trackingOrder } = useTrackingOrder();
  const { isError: isOrderError, isLoading: isOrderLoading, orderDetails: order } = useOrderDetials();

  const isLoading = isTrackLoading || isOrderLoading;
  const isError = isTrackError || isOrderError;

  if (isLoading) {
    return <OrderStatusSkeleton />;
  }

  if (isError) {
    return <OrderStatusError />;
  }

  // The tracking endpoint returns { status, shipment, delivery }
  const status = trackingOrder?.status || order?.status;
  const isDelivered = status?.toLowerCase() === "delivered";
  const isShipped = isDelivered || status?.toLowerCase() === "shipped";
  const isProcessing = isShipped || status?.toLowerCase() === "processing";

  return (
    <section className="bg-[#FAF9F6] min-h-screen py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        
        <Link
          to="/orders"
          className="text-[12px] font-bold tracking-widest uppercase text-[#555a5b] hover:text-[#06373A] transition-colors mb-8 inline-block"
        >
          ← Back to Orders
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-2">Order Details</p>
            <h1 className="font-display-lg text-[32px] text-[#06373A] leading-tight mb-2">
              Track Order
            </h1>
            <p className="text-[14px] text-[#555a5b]">
              Order #{order?.order_ref || order?.order_id || "Unknown"}
            </p>
          </div>
          <div className="bg-white border border-[#E8E4DE] rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-[#E8EFF0] rounded-lg flex items-center justify-center text-[#06373A]">
              📅
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Estimated Delivery</p>
              <p className="text-[14px] font-semibold text-[#06373A]">
                {trackingOrder?.delivery || "Pending"}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-[#E8E4DE] rounded-2xl p-8 mb-8 shadow-sm overflow-x-auto">
          <div className="min-w-[600px] relative">
            {/* The line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-[#E8E4DE] -z-10"></div>
            <div 
              className="absolute top-6 left-[10%] h-0.5 bg-[#032b26] -z-10 transition-all duration-1000"
              style={{ width: isDelivered ? '80%' : isShipped ? '55%' : isProcessing ? '25%' : '0%' }}
            ></div>

            <div className="flex justify-between relative z-10">
              {/* Step 1: Placed */}
              <div className="flex flex-col items-center w-1/4">
                <div className="w-12 h-12 rounded-full bg-[#032b26] text-white flex items-center justify-center mb-3 shadow-sm">
                  ✓
                </div>
                <p className="text-[12px] font-bold text-[#06373A] mb-1">Order Placed</p>
                <p className="text-[11px] text-[#555a5b]">
                  {order?.created_at ? new Date(order.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }) : "Received"}
                </p>
              </div>

              {/* Step 2: Processing */}
              <div className="flex flex-col items-center w-1/4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-colors ${isProcessing ? 'bg-[#032b26] text-white' : 'bg-white border border-[#E8E4DE] text-[#aab7c4]'}`}>
                  📦
                </div>
                <p className={`text-[12px] font-bold mb-1 ${isProcessing ? 'text-[#06373A]' : 'text-[#aab7c4]'}`}>Processing</p>
                <p className="text-[11px] text-[#555a5b]">
                  {isProcessing ? "In Progress" : "Pending"}
                </p>
              </div>

              {/* Step 3: Shipped */}
              <div className="flex flex-col items-center w-1/4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-colors ${isShipped ? 'bg-[#032b26] text-white' : 'bg-white border border-[#E8E4DE] text-[#aab7c4]'}`}>
                  🚚
                </div>
                <p className={`text-[12px] font-bold mb-1 ${isShipped ? 'text-[#06373A]' : 'text-[#aab7c4]'}`}>Shipped</p>
                <p className="text-[11px] text-[#555a5b]">
                  {trackingOrder?.shipment || "Pending"}
                </p>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex flex-col items-center w-1/4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-colors ${isDelivered ? 'bg-[#032b26] text-white' : 'bg-white border border-[#E8E4DE] text-[#aab7c4]'}`}>
                  📍
                </div>
                <p className={`text-[12px] font-bold mb-1 ${isDelivered ? 'text-[#06373A]' : 'text-[#aab7c4]'}`}>Delivered</p>
                <p className="text-[11px] text-[#555a5b]">
                  {isDelivered ? "Completed" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left: Details */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Shipping Box */}
            <div className="bg-white border border-[#E8E4DE] rounded-2xl shadow-sm p-6 lg:p-8">
              <h3 className="font-display-lg text-[20px] text-[#06373A] border-b border-[#E8E4DE]/50 pb-4 mb-6">
                Shipping Details
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-2">Carrier</p>
                  <p className="text-[14px] font-semibold text-[#06373A]">
                    {trackingOrder?.carrier || "Standard Shipping"} ↗
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-2">Tracking Number</p>
                  <p className="text-[14px] font-semibold text-[#06373A] flex items-center gap-2">
                    {trackingOrder?.tracking_number || "Pending"} 📋
                  </p>
                </div>
              </div>

              {/* Alert Box */}
              <div className="bg-[#E8EFF0]/50 border border-[#dce6e7] rounded-xl p-5 flex gap-4">
                <div className="text-[#06373A] shrink-0 mt-0.5">ℹ️</div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#06373A] mb-1">
                    Latest Update: {isShipped ? "In Transit" : "Processing"}
                  </h4>
                  <p className="text-[12px] text-[#555a5b] leading-relaxed">
                    {isShipped ? "Your package has departed the sorting facility and is en route to the destination." : "We are preparing your order for shipment."}
                  </p>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white border border-[#E8E4DE] rounded-2xl shadow-sm p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] border-b border-[#E8E4DE]/50 pb-3 mb-4">
                    Shipping Address
                  </h3>
                  <p className="text-[13px] font-semibold text-[#06373A] mb-1">
                    {order?.user?.first_name} {order?.user?.last_name}
                  </p>
                  <p className="text-[13px] text-[#555a5b] leading-relaxed">
                    {order?.address?.street_address}<br/>
                    {order?.address?.city}, {order?.address?.state || "CA"} {order?.address?.zip_code}<br/>
                    {order?.address?.country || "United States"}
                  </p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] border-b border-[#E8E4DE]/50 pb-3 mb-4">
                    Billing Address
                  </h3>
                  <p className="text-[13px] font-semibold text-[#06373A] mb-1">
                    {order?.user?.first_name} {order?.user?.last_name}
                  </p>
                  <p className="text-[13px] text-[#555a5b] leading-relaxed">
                    Same as shipping address
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E8E4DE] rounded-2xl shadow-sm">
              <div className="p-6 lg:p-8 border-b border-[#E8E4DE]/50">
                <h3 className="font-display-lg text-[20px] text-[#06373A] mb-1">Items in Order</h3>
                <p className="text-[12px] text-[#555a5b]">{order?.items?.length || 0} items · Standard Packaging</p>
              </div>

              <div className="p-6 lg:p-8 space-y-6">
                {order?.items?.map((item) => (
                  <div key={item.order_item_id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#F5F5F5] rounded-lg overflow-hidden shrink-0 border border-[#E8E4DE]">
                      <img 
                        src={item.variant?.product?.images?.[0]?.image_url || item.variant?.product?.image_url || item.variant?.image_url || "https://placehold.co/100x100?text=Product"} 
                        alt={item.variant?.product?.product_name || "Product Image"}
                        className="w-full h-full object-cover mix-blend-multiply"
                        onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Product"; }}
                      />
                    </div>
                    <div className="flex-1 py-0.5 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-display-lg text-[14px] font-semibold text-[#06373A] leading-snug">
                          {item.variant?.product?.product_name}
                        </h4>
                        <p className="text-[13px] font-semibold text-[#06373A]">
                          ${Number(item.price_at_purchase).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-[11px] text-[#555a5b]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="bg-[#FAF9F6]/50 p-6 lg:p-8 border-t border-[#E8E4DE]">
                <div className="space-y-3 font-body-md text-[13px] text-[#555a5b]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#06373A]">${Number(order?.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#06373A]">${Number(order?.shipping).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-semibold text-[#06373A]">${Number(order?.tax).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 mt-2 border-t border-[#E8E4DE] items-center">
                    <span className="font-display-lg text-[18px] text-[#06373A]">Total</span>
                    <span className="font-display-lg text-[18px] font-semibold text-[#06373A]">
                      ${Number(order?.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function OrderStatusSkeleton() {
  return (
    <section className="bg-[#FAF9F6] min-h-screen py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 animate-pulse">
        <div className="h-4 w-32 bg-[#EAEAEA] rounded mb-12"></div>
        <div className="flex justify-between mb-12">
          <div>
            <div className="h-10 w-64 bg-[#EAEAEA] rounded mb-4"></div>
            <div className="h-4 w-40 bg-[#EAEAEA] rounded"></div>
          </div>
          <div className="h-16 w-48 bg-[#EAEAEA] rounded-xl"></div>
        </div>
        <div className="h-40 w-full bg-[#EAEAEA] rounded-2xl mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 h-64 bg-[#EAEAEA] rounded-2xl"></div>
          <div className="lg:col-span-2 h-96 bg-[#EAEAEA] rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}

export function OrderStatusError() {
  return (
    <section className="bg-[#FAF9F6] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E8E4DE] shadow-sm rounded-2xl p-8 text-center space-y-4">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <h2 className="text-[20px] font-display-lg text-[#06373A]">Failed to load tracking info</h2>
        <p className="text-[13px] text-[#555a5b] mb-6">Something went wrong while fetching your order details.</p>
        <Link to="/orders" className="block w-full bg-[#032b26] text-white text-[12px] font-semibold tracking-widest uppercase py-3.5 rounded-xl hover:bg-[#06373A] transition-colors">
          Go to Orders
        </Link>
      </div>
    </section>
  );
}
