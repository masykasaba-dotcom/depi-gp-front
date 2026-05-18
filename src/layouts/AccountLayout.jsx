import { NavLink, Link, useLocation } from "react-router";
import useSignOut from "../hooks/useSignOut";

export default function AccountLayout({ children }) {
  const { handleSignOut } = useSignOut();
  const location = useLocation();

  const menuItems = [
    { to: "/profile", label: "Profile Details" },
    { to: "/orders", label: "Order History" },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/addresses", label: "Addresses" },
    { to: "/payment-methods", label: "Payment Methods" },
  ];

  // Determine current active page label for breadcrumbs
  const currentItem = menuItems.find((item) => location.pathname === item.to);
  const pageLabel = currentItem ? currentItem.label : "Account";

  return (
    <section className="bg-[#FAF9F6] min-h-screen py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-3 mb-10 font-label-caps text-[10px] text-on-secondary-container tracking-widest uppercase">
          <Link to="/" className="hover:text-[#06373A] transition-colors">Home</Link>
          <span className="text-outline-variant">/</span>
          <span className="text-outline-variant">My Account</span>
          <span className="text-outline-variant">/</span>
          <span className="text-[#06373A] font-semibold">{pageLabel}</span>
        </nav>

        {/* ── 2 Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <h1 className="font-display-lg text-[28px] text-[#06373A] leading-tight mb-8">
              My Account
            </h1>
            <nav className="flex flex-col gap-1 border-r border-[#E8E4DE] pr-6">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#06373A]/8 text-[#06373A] font-semibold"
                        : "text-on-secondary-container hover:bg-[#06373A]/4 hover:text-[#06373A]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2"
              >
                Log Out
              </button>
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
