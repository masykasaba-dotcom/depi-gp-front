import axios from "axios";
import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../store/AuthContext";
import { useQuery } from "@tanstack/react-query";
import OrderCard from "../components/OrderCard";
import useGetOrdres from "../hooks/useGetOrdres";

export default function Orders() {
  const { orders, isLoading } = useGetOrdres();
  return (
    <section className="bg-base-100 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <header className="mb-10 text-center md:text-left border-b border-base-300 pb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
            Account Area
          </p>
          <h1 className="font-serif text-3xl font-light text-base-content md:text-4xl">
            Order History
          </h1>
          <p className="mt-2 text-base-content/70">
            Track shipping status and manage your past purchases.
          </p>
        </header>
        {isLoading && <LoadingScreen />}
        {orders?.length === 0 && (
          <p className="text-gray-500 text-base text-center mt-4">
            You haven’t placed any orders yet.
          </p>
        )}
        {orders?.map((order) => (
          <OrderCard
            key={order?.order_id}
            orderId={order?.order_id}
            orderRef={order?.order_ref}
            status={order?.status}
            createdAt={order?.created_at}
            shipping={order?.shipping}
            tax={order?.tax}
            total={order?.total}
            amount={order?.payment.amount}
            paymentStatus={order?.payment.status}
            subtotal={order?.subtotal}
          />
        ))}
      </div>
    </section>
  );
}

function LoadingScreen() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}
