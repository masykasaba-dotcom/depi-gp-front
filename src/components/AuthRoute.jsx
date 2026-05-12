import { Navigate } from "react-router";
import Cookies from "js-cookie";
export default function AuthRoute({ children }) {
  const isLoggedIn = Cookies.get('tkn');

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}