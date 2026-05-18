import { useState, use, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { CartContext } from "../../context/CartContext";
import useSignOut from "../../hooks/useSignOut";
import logo from "../../assets/logo-removebg-preview.png";

export default function Navbar() {
  const { token, handleSignOut } = useSignOut();
  const { productsNumber } = use(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If we are on the Home page, use scroll logic. 
  // Otherwise, the navbar should ALWAYS be solid so the white text is readable.
  const isSolid = !isHomePage || isScrolled;

  const navClasses = isSolid
    ? "bg-[#04362E] backdrop-blur-lg border-b border-white/10 shadow-sm"
    : "bg-transparent border-b border-transparent lg:border-white/10";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}>
        <div className="flex justify-between items-center h-16 px-5 lg:px-12 max-w-[1440px] mx-auto">

          {/* ─── Logo ─── */}
          <Link
            to="/"
            className={`font-serif text-[22px] tracking-wide no-underline flex-shrink-0 text-white ${!isSolid ? "drop-shadow-sm" : ""}`}
          >
            <img src={logo} alt="DermaCare Logo" className="h-12 md:h-16 scale-110 w-auto object-contain brightness-0 invert drop-shadow-sm" />
          </Link>

          {/* ─── Center Nav — Desktop ─── */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1">
              {token ? (
                <NavItemsDesktop />
              ) : (
                <>
                  <DesktopNavLink to="/products">Shop</DesktopNavLink>
                  <DesktopNavLink to="/blog">Clinical Journal</DesktopNavLink>
                  <DesktopNavLink to="/about">About DermaCare</DesktopNavLink>
                  <DesktopNavLink to="/profile/survey">Skin Quiz</DesktopNavLink>
                </>
              )}
            </ul>
          </nav>

          {/* ─── Right Actions ─── */}
          <div className="flex items-center gap-1">

            {token ? (
              <>
                {/* Profile */}
                <NavLink
                  to="/profile"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all text-white/80 hover:text-white hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </NavLink>

                {/* Cart */}
                <NavLink
                  to="/cart"
                  className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all text-white/80 hover:text-white hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  {productsNumber > 0 && (
                    <span className="absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold bg-white text-[#04362E]">
                      {productsNumber}
                    </span>
                  )}
                </NavLink>

                {/* Sign out */}
                <button
                  onClick={handleSignOut}
                  className="hidden lg:flex items-center gap-1.5 text-xs font-medium transition-all ml-1 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Sign out
                </button>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-2 ml-2">
                <NavLink
                  to="/sign-in"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-all text-white/80 hover:text-white hover:bg-white/10"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm bg-white text-[#04362E] hover:bg-white/90"
                >
                  Create Account
                </NavLink>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all ml-1 text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Drawer ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 left-0 h-full w-72 bg-white dark:bg-[#0a1a18] shadow-xl flex flex-col animate-fade-in-up">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#e8ecee]">
              <img src={logo} alt="DermaCare Logo" className="h-10 scale-110 w-auto object-contain" />
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#555a5b] hover:bg-[#06373A]/8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer nav links */}
            <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
              {token ? (
                <>
                  {[
                    { to: "/", label: "Home" },
                    { to: "/products", label: "Products" },
                    { to: "/blog", label: "Clinical Journal" },
                    { to: "/profile/survey", label: "Skin Quiz" },
                    { to: "/about", label: "About DermaCare" },
                    { to: "/profile", label: "Profile" },
                    { to: "/orders", label: "Orders" },
                    { to: "/wishlist", label: "Wishlist" },
                  ].map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-[#06373A]/10 text-[#06373A]"
                            : "text-[#444748] hover:bg-[#06373A]/6 hover:text-[#06373A]"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                  <div className="h-px bg-[#e8ecee] my-3" />
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  {[
                    { to: "/products", label: "Shop" },
                    { to: "/blog", label: "Clinical Journal" },
                    { to: "/about", label: "About DermaCare" },
                    { to: "/profile/survey", label: "Skin Quiz" },
                    { to: "/faqs", label: "FAQs" },
                    { to: "/contact", label: "Contact" },
                  ].map(({ to, label }) => (
                    <NavLink
                      key={label}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-[#444748] hover:bg-[#06373A]/6 hover:text-[#06373A] transition-colors"
                    >
                      {label}
                    </NavLink>
                  ))}
                  <div className="h-px bg-[#e8ecee] my-3" />
                  <NavLink
                    to="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center px-3 py-3 rounded-lg text-sm font-semibold text-[#06373A] border border-[#06373A]/25 hover:bg-[#06373A]/6 transition-colors"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center px-3 py-3 rounded-lg text-sm font-semibold bg-[#04362E] text-white hover:bg-[#03241e] transition-colors shadow-sm"
                  >
                    Create Account
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// Desktop nav link with active indicator
function DesktopNavLink({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            isActive
              ? "text-white bg-white/15"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

// Logged-in desktop nav using NavItems
function NavItemsDesktop() {
  return (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/products", label: "Products" },
        { to: "/blog", label: "Clinical Journal" },
        { to: "/profile/survey", label: "Skin Quiz" },
        { to: "/about", label: "About DermaCare" },
      ].map(({ to, label }) => (
        <DesktopNavLink key={to} to={to}>{label}</DesktopNavLink>
      ))}
    </>
  );
}
