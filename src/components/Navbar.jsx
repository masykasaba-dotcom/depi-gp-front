import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCircleUser,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import NavItems from "./NavItems";
import { Link, NavLink } from "react-router";
import { CartContext } from "../store/CartContext";
import useDarkMode from "../hooks/useDarkMode";
import useSignOut from "../hooks/useSignOut";
import { use } from "react";

export default function Navbar() {
  const { darkMode, handleDarkMode } = useDarkMode();
  const { token , handleSignOut } = useSignOut();
  const { productsNumber } = use(CartContext);
  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="ps-0 pe-2 lg:hidden">
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
            className=" dropdown-content bg-base-100  rounded-box z-20 mt-3 w-52 p-2 shadow"
          >
            {token ? (
              <>
                <NavItems />
                <li className="cursor-pointer">
                  <p onClick={handleSignOut} className="pb-1">
                    Sign-out
                  </p>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/sign-in" className="pb-1 cursor-pointer">
                    Sign-in
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="text-xl no-underline">
          LUMIÈRE
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" menu-horizontal gap-8 px-1">
          {token ? (
            <>
              <NavItems />
              <li>
                <p onClick={handleSignOut} className="pb-1 cursor-pointer">
                  Sign-out
                </p>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/sign-in" className="pb-1">
                  Sign-in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-3 ">
        <FontAwesomeIcon
          onClick={handleDarkMode}
          className="cursor-pointer"
          icon={darkMode === "dark" ? faSun : faMoon}
        />
        {token && (
          <NavLink to="/profile">
            <FontAwesomeIcon className="cursor-pointer" icon={faCircleUser} />
          </NavLink>
        )}
        {token && (
          <NavLink to="/cart" className="relative inline-block">
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faCartArrowDown}
            />

            {/* Badge */}
            <span className="absolute -top-3  -right-1.5  text-[12px] px-0.5 py-0.5 rounded-full font-bold">
              {productsNumber}
            </span>
          </NavLink>
        )}
      </div>
    </div>
  );
}
