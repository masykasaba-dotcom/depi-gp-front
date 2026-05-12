import { NavLink } from "react-router";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
  { to: "/addresses", label: "Addresses" },
];

export default function NavItems() {
 
  return (
    <>
      {NAV_ITEMS.map(({ to, label }) => (
        <li key={to}>
          <NavLink to={to} className="pb-1">
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );
}
