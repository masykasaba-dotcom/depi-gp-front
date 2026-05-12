import React from "react";
import { use } from "react";
import { CartContext } from "../store/CartContext";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function useAddProduct(variantId, stock) {
  const { handleAddProductToCart } = use(CartContext);

  function addProduct(event) {
    event.preventDefault();
    if (stock === 0) {
      toast(
        "there is no items in this variant, click on it and check the other variant",
        {
          icon: (
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-red-600"
            />
          ),
          position : 'top-right',
          style:{
            backgroundColor: '#ffff00'
          }
        },
      );
      return
    }
    
    const productData = {
      variant_id: variantId,
      quantity: 1,
    };
    handleAddProductToCart(productData);
  }

  return addProduct;
}
