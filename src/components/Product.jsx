import { Link } from "react-router";
import { memo } from "react";
import { use } from "react";
import { CartContext } from "../store/CartContext";
import useAddProduct from "../hooks/useAddProduct";
export default memo(function Product({
  id,
  image,
  name,
  description,
  variantOne,
  variantTwo,
  maxPrice,
  minPrice,
}) {
  console.log(maxPrice)
  console.log(minPrice)
  console.log('50' > '40')
  let selctedVariant;
  if (
    (maxPrice === "" || maxPrice === undefined) &&
    (minPrice === "" || minPrice === undefined)
  ) {
    selctedVariant = variantOne;
  }

  if (variantOne.price >= minPrice && variantOne.price <= maxPrice) {
    selctedVariant = variantOne;
  }

  if (variantTwo.price >= minPrice && variantTwo.price <= maxPrice) {
    selctedVariant = variantTwo;
  }

  if (variantOne.price >= minPrice && maxPrice == '') {
    selctedVariant = variantOne;
  }
  
  if (variantTwo.price >= minPrice && maxPrice == '') {
    selctedVariant = variantTwo;
  }

  const addProduct = useAddProduct(
    selctedVariant.variant_id,
    selctedVariant.stock,
  );
  return (
    <Link
      to={`/products/${id}`}
      className="block h-full  rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
          alt={name}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[calc(100%-14rem)]">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-2">
          <p className="text-lg font-semibold  line-clamp-1">{name}</p>

          <span className="  text-sm font-medium px-3 py-1 rounded-full">
            ${selctedVariant.price}
          </span>
        </div>

        {/* Description */}
        <p className=" text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <button
          onClick={(event) => addProduct(event)}
          className="mt-auto w-full py-2.5 rounded-lg bg-black text-white text-sm font-medium tracking-wide hover:opacity-90 active:scale-95 transition"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
});
