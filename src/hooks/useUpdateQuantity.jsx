import { useContext } from "react";
import { useActionState } from "react";
import { useOptimistic } from "react";
import { CartContext } from "../store/CartContext";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function useUpdateQuantity(id, quantity, stock) {
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    quantity,
    (prevState, mode) =>
      mode === "up" ? prevState + 1 : prevState - 1
  );

  const { handleRemoveProductFromCart, handleUpdateQuantity } =
    useContext(CartContext);

  async function handleUpQuantity(_, formData) {
    if (optimisticValue + 1 > stock) {
      toast("you can't buy more than that", {
        position: "top-right",
        icon: <FontAwesomeIcon icon={faX} className="text-red-600" />,
        className: "w-[25vw]",
      });
      return;
    }

    const newValue = optimisticValue + 1;
    setOptimisticValue("up");

    await handleUpdateQuantity(id, newValue);
  }

  async function handleDownQuantity(_, formData) {
    const newValue = optimisticValue - 1;

    if (newValue === 0) {
      setOptimisticValue("down");
      await handleRemoveProductFromCart(id);
      return;
    }

    setOptimisticValue("down");
    await handleUpdateQuantity(id, newValue);
  }

  const [_, upQuantityAction, upQuantityPending] =
    useActionState(handleUpQuantity, null);

  const [__, downQuantityAction, downQuantityPending] =
    useActionState(handleDownQuantity, null);

  return {
    upQuantityAction,
    downQuantityAction,
    upQuantityPending,
    downQuantityPending,
    optimisticValue,
  };
}