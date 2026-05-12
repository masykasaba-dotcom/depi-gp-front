import { Link } from "react-router";
import useOrderDetials from "../hooks/useOrderDetials";

export default function OrderDetials() {
  const { isError, isLoading, orderDetails } = useOrderDetials();
  return (
    <>
      {isLoading && <OrderDetailsSkeleton />}
      {isError && <OrderDetailsError />}
      {!isLoading && !isError && (
        <section className="bg-base-100 min-h-screen py-12">
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <Link
              to="/orders"
              className="text-sm font-semibold text-base-content/60 hover:text-primary transition underline underline-offset-4"
            >
              ← Back to Orders
            </Link>

            <header className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-base-300 pb-6 mb-8">
              <div>
                <h1 className="font-serif text-3xl font-light text-base-content">
                  Order #{orderDetails?.order_id}
                </h1>
                <p className="mt-2 text-sm text-base-content/70">
                  Placed on {new Date(orderDetails?.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-left md:text-right">
                <span className="badge badge-success badge-lg font-semibold tracking-wide border-transparent">
                  {orderDetails?.status}
                </span>
              </div>
            </header>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                {/* ORDER ITEMS */}
                <div className="rounded-2xl border border-base-300 bg-base-200/30 overflow-hidden">
                  <table className="table w-full text-left">
                    <thead className="bg-base-200/50 text-base-content/70 border-b border-base-300">
                      <tr>
                        <th className="p-4 text-xs uppercase">Item</th>
                        <th className="p-4 text-xs text-right uppercase">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.items?.map((item) => (
                        <tr
                          key={item.order_item_id}
                          className="border-b hover:bg-base-200/50"
                        >
                          <td className="p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded bg-base-300 border shrink-0" />
                            <div>
                              <Link to={`/products/${item.variant?.product?.product_id}`} className="font-medium">
                                {item.variant?.product?.product_name}
                              </Link>
                              <p className="text-xs opacity-60">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${item.price_at_purchase}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* PAYMENT SUMMARY */}
                <div className="rounded-2xl border border-base-300 bg-base-200/30 p-6">
                  <h3 className="font-serif text-lg mb-4 border-b pb-2">
                    Payment Summary
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        ${orderDetails?.subtotal}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">
                        ${orderDetails?.shipping}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-medium">${orderDetails?.tax}</span>
                    </li>
                    <li className="flex justify-between border-t pt-3 font-semibold">
                      <span>Total</span>
                      <span>${orderDetails?.total}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                {/* PAYMENT INFO */}
                <div className="rounded-2xl border border-base-300 bg-base-200/50 p-6">
                  <h3 className="font-serif text-lg mb-4 border-b pb-2">
                    Payment Info
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs uppercase opacity-60">Status</p>
                      <p className="font-medium">
                        {orderDetails?.payment?.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase opacity-60">Amount</p>
                      <p className="font-medium">
                        ${orderDetails?.payment?.amount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase opacity-60">Payment ID</p>
                      <p className="font-medium">
                        {orderDetails?.payment?.payment_id}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to="track"
                  className="text-blue-700 ms-6 cursor-pointer hover:underline"
                >
                  Track Your Package
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
function OrderDetailsSkeleton() {
  return (
    <section className="bg-base-100 min-h-screen py-12 animate-pulse">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Back */}
        <div className="w-32 h-4 bg-base-300 rounded mb-6"></div>

        {/* Header */}
        <div className="flex justify-between items-end border-b border-base-300 pb-6 mb-8">
          <div>
            <div className="w-48 h-6 bg-base-300 rounded mb-2"></div>
            <div className="w-32 h-4 bg-base-300 rounded"></div>
          </div>
          <div className="w-24 h-6 bg-base-300 rounded"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">
            {/* Items */}
            <div className="rounded-2xl border border-base-300 p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-base-300 rounded"></div>
                    <div>
                      <div className="w-32 h-4 bg-base-300 rounded mb-2"></div>
                      <div className="w-16 h-3 bg-base-300 rounded"></div>
                    </div>
                  </div>
                  <div className="w-12 h-4 bg-base-300 rounded"></div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="rounded-2xl border border-base-300 p-6 space-y-4">
              <div className="w-40 h-5 bg-base-300 rounded"></div>

              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="w-24 h-4 bg-base-300 rounded"></div>
                  <div className="w-16 h-4 bg-base-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-base-300 p-6 space-y-4">
              <div className="w-32 h-5 bg-base-300 rounded"></div>

              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="w-20 h-3 bg-base-300 rounded mb-2"></div>
                  <div className="w-28 h-4 bg-base-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderDetailsError() {
  return (
    <section className="bg-base-100 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>

        <h2 className="text-xl font-semibold mb-2">Failed to load order</h2>

        <p className="text-sm text-base-content/70 mb-6">
          Something went wrong while fetching order details.
        </p>
      </div>
    </section>
  );
}
