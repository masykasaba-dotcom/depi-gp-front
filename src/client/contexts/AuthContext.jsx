import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  savedCustomerId : null
});

// eslint-disable-next-line react/prop-types
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const decodedToken = token ? jwtDecode(token) : null;

  const savedCustomerId =decodedToken?.customerId
    
  useEffect(() => {
    if (Cookies.get('tkn')) {
      setToken(Cookies.get('tkn'));
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        savedCustomerId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
