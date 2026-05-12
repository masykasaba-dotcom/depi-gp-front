import { Navigate } from "react-router";
import Cookies from "js-cookie";
export default function UnAuthRoute({ children }) {
  const isLoggedIn = Cookies.get('tkn');

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}