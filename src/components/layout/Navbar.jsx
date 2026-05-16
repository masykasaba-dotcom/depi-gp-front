import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCircleUser,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import NavItems from "./NavItems";
import { Link, NavLink } from "react-router";
import { CartContext } from "../../context/CartContext";
import useDarkMode from "../../hooks/useDarkMode";
import useSignOut from "../../hooks/useSignOut";
import { use } from "react";

export default function Navbar() {
  const { darkMode, handleDarkMode } = useDarkMode();
  const { token, handleSignOut } = useSignOut();
  const { productsNumber } = use(CartContext);
  return (
    <header className="sticky top-0 z-50 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#c4c7c7]">
      <div className="flex justify-between items-center h-20 px-6 lg:px-16 max-w-[1440px] mx-auto">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="p-2 -ml-2 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content bg-white border border-[#c4c7c7] rounded-none z-20 mt-3 w-52 p-4 shadow-lg flex flex-col gap-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#444748]"
            >
              {token ? (
                <>
                  <NavItems />
                  <li
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={handleSignOut}
                  >
                    Sign-out
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/products"
                      className="hover:text-black transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <span className="hover:text-black transition-colors cursor-pointer">
                      Clinical Research
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-black transition-colors cursor-pointer">
                      About
                    </span>
                  </li>
                  <div className="h-px w-full bg-[#c4c7c7] my-2"></div>
                  <li>
                    <NavLink to="/sign-in" className="text-black font-bold">
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sign-up"
                      className="hover:text-black transition-colors"
                    >
                      Create Account
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="font-serif text-[24px] lg:text-[28px] text-black tracking-tighter no-underline"
          >
            LUMIÈRE
          </Link>
        </div>

        {/* Center: Desktop Nav Items */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-10 font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#444748]">
            {token ? (
              <NavItems />
            ) : (
              <>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-black transition-colors tracking-[0.2em]"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <span className="hover:text-black transition-colors cursor-pointer tracking-[0.2em]">
                    Clinical Research
                  </span>
                </li>
                <li>
                  <span className="hover:text-black transition-colors cursor-pointer tracking-[0.2em]">
                    About
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#444748]">
          <div className="hidden lg:flex items-center gap-6">
            {token ? (
              <span
                className="cursor-pointer hover:text-black transition-colors tracking-[0.2em]"
                onClick={handleSignOut}
              >
                Sign-out
              </span>
            ) : (
              <>
                <NavLink
                  to="/sign-in"
                  className="text-black font-bold underline underline-offset-4 decoration-[#c4c7c7] hover:decoration-black transition-colors tracking-[0.1em]"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="bg-black text-white hover:bg-black/90 transition-colors tracking-[0.1em] px-4 py-2"
                >
                  Create Account
                </NavLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-5 text-black text-[16px]">
            <FontAwesomeIcon
              onClick={handleDarkMode}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              icon={darkMode === "dark" ? faSun : faMoon}
            />
            {token && (
              <NavLink
                to="/profile"
                className="hover:opacity-70 transition-opacity"
              >
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faCircleUser}
                />
              </NavLink>
            )}
            {token && (
              <NavLink
                to="/cart"
                className="relative inline-block hover:opacity-70 transition-opacity"
              >
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faCartArrowDown}
                />
                <span className="absolute -top-2 -right-2 text-[9px] bg-black text-white px-1.5 py-0.5 rounded-full font-bold">
                  {productsNumber}
                </span>
              </NavLink>
            )}
            {!token && (
              <span className="cursor-pointer hover:opacity-70 transition-opacity hidden md:inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
