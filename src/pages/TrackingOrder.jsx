import React from "react";
import useTrackingOrder from "../hooks/useTrackingOrder";

export default function TrackingOrder() {
  const {isError,isLoading,trackingOrder} = useTrackingOrder()
  return (
    <>
      {isLoading && <OrderStatusSkeleton />}
      {isError && <OrderStatusError />}
      {!isLoading && !isError && (
        <div className="min-h-screen flex items-center justify-center  p-4">
          <div className="w-full max-w-md shadow-lg rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold">Order Status</h2>

            {/* Status */}
            <div className="flex items-center justify-between border p-4 rounded-xl">
              <span className="">Status</span>
              <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                {trackingOrder.status}
              </span>
            </div>

            {/* Shipment */}
            <div className="flex items-center justify-between border p-4 rounded-xl">
              <span>Shipment</span>
              <span className="italic">
                {trackingOrder.shipment
                  ? trackingOrder.shipment
                  : "Not shipped yet"}
              </span>
            </div>

            {/* Delivery */}
            <div className="flex items-center justify-between border p-4 rounded-xl">
              <span>Delivery</span>
              <span className="italic">
                {trackingOrder.delivery
                  ? trackingOrder.delivery
                  : "No delivery info"}
              </span>
            </div>

            {/* Message */}
            <div className="bg-yellow-50 text-yellow-700 text-sm p-3 rounded-lg">
              Your order is still being processed. Please wait for shipment
              update.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function OrderStatusSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md shadow-lg rounded-2xl p-6 space-y-6 animate-pulse">
        {/* Title */}
        <div className="h-6 w-40 bg-gray-200 rounded"></div>

        {/* Status */}
        <div className="flex items-center justify-between border p-4 rounded-xl">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Shipment */}
        <div className="flex items-center justify-between border p-4 rounded-xl">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>

        {/* Delivery */}
        <div className="flex items-center justify-between border p-4 rounded-xl">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>

        {/* Message */}
        <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
export function OrderStatusError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md  shadow-lg rounded-2xl p-6 text-center space-y-4">
        {/* Icon */}
        <div className="text-red-500 text-4xl">⚠️</div>

        {/* Title */}
        <h2 className="text-xl font-bold ">Failed to load order</h2>

        {/* Message */}
        <p className=" text-sm">Something went wrong</p>

        {/* Button */}
        <button className="mt-4 w-full   py-2 rounded-xl hover:opacity-90 transition">
          Try Again
        </button>
      </div>
    </div>
  );
}
