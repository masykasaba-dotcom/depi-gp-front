import React from "react";
import { use } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useActionState } from "react";
import apiUrl from "../../shared/utils/apiUrl";

export default function useMakeOrder() {
  const { token } = use(AuthContext);
  const { setCartProducts } = use(CartContext);
  const navigate = useNavigate();
  async function handleMakeOrder(prevState, formData) {
    await axios
      .post(
        `${apiUrl}orders`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((data) => {
        setCartProducts([]);
        navigate("/orders");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [formState, formAction, pending] = useActionState(handleMakeOrder);

  return {
    formAction,
    pending
  }
}
