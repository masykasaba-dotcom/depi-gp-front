import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import apiUrl from "../lib/apiUrl";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export const CartContext = createContext({
  cartProducts: [],
  setCartProducts: () => {},
});

export default function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState([]);
  const productsNumber = cartProducts.length;
  let totalPrice = 0;
  for (const product of cartProducts) {
    totalPrice += product.quantity * +product.price;
  }

  async function getCartProducts() {
    axios
      .get(`${apiUrl}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setCartProducts(data.data.items);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  async function handleAddProductToCart(productData) {
    axios
      .post(
        `${apiUrl}cart/items`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(async (_) => {
        await getCartProducts();
        toast("Product Added To Cart", {
          position: "top-right",
          icon: <FontAwesomeIcon icon={faCheck} className="text-green-600" />,
          className: "w-[25vw]",
        });
      })
      .catch((err) => {
        toast("Fialed Adding To Cart", {
          position: "top-right",
          icon: <FontAwesomeIcon icon={faX} className="text-red-600" />,
          className: "w-[25vw]",
        });
      });
  }
  async function handleRemoveProductFromCart(cartItemId) {
    await axios
      .delete(
        `${apiUrl}cart/items/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(async (_) => {
        await getCartProducts();
        toast("Product Removed From Cart", {
          position: "top-right",
          icon: <FontAwesomeIcon icon={faCheck} className="text-green-600" />,
          className: "w-[25vw]",
        });
      })
      .catch((err) => {
        toast("Fialed Removing From Cart", {
          position: "top-right",
          icon: <FontAwesomeIcon icon={faX} className="text-red-600" />,
          className: "w-[25vw]",
        });
      });
  }

  async function handleUpdateQuantity(cartItemId, quantity) {
    axios
      .put(
        `${apiUrl}cart/items/${cartItemId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((_) => {
        getCartProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // handleUpdateQuantity(44,30)
    useEffect(() => {
      if(token)
    getCartProducts();
  }, [token]);

  return (
    <CartContext
      value={{
        cartProducts,
        totalPrice,
        productsNumber,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleUpdateQuantity,
        setCartProducts
      }}
    >
      {children}
    </CartContext>
  );
}
