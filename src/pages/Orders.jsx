import { useState } from "react";
import OrderCard from "../features/orders/OrderCard";
import useGetOrdres from "../hooks/useGetOrdres";
import AccountLayout from "../layouts/AccountLayout";

export default function Orders() {
  const { orders, isLoading } = useGetOrdres();
  const [activeTab, setActiveTab] = useState("All Orders");

  // Filter logic
  const filteredOrders = orders?.filter(order => {
    if (activeTab === "Processing") {
      return order.status.toLowerCase() !== "delivered" && order.status.toLowerCase() !== "cancelled";
    }
    return true; // "All Orders"
  }) || [];

  return (
    <AccountLayout>
      <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E4DE]/50 pb-6 mb-8">
          <div>
            <h2 className="font-display-lg text-[22px] text-[#06373A] leading-tight mb-1.5">
              Order History
            </h2>
            <p className="font-body-md text-[13px] text-[#555a5b]">
              Review your past clinical formulations and track current shipments.
            </p>
          </div>
          <div className="flex bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E4DE]">
            <button
              onClick={() => setActiveTab("All Orders")}
              className={`px-4 py-2 text-[12px] font-semibold rounded-lg transition-colors ${
                activeTab === "All Orders"
                  ? "bg-white text-[#06373A] shadow-sm"
                  : "text-[#555a5b] hover:text-[#06373A]"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab("Processing")}
              className={`px-4 py-2 text-[12px] font-semibold rounded-lg transition-colors ${
                activeTab === "Processing"
                  ? "bg-white text-[#06373A] shadow-sm"
                  : "text-[#555a5b] hover:text-[#06373A]"
              }`}
            >
              Processing
            </button>
          </div>
        </div>

        {isLoading && <LoadingScreen />}

        {!isLoading && filteredOrders.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[#E8E4DE] rounded-2xl">
            <p className="font-body-md text-[14px] text-on-secondary-container mb-4">
              You haven’t placed any orders matching this filter yet.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order?.order_id} order={order} />
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}

function LoadingScreen() {
  return (
    <div className="flex w-full flex-col gap-4 animate-pulse">
      <div className="h-48 w-full bg-[#EAEAEA] rounded-2xl" />
      <div className="h-48 w-full bg-[#EAEAEA] rounded-2xl" />
    </div>
  );
}
