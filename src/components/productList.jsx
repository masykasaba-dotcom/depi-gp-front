import Product from "./Product";
import { memo } from "react";
import ProductsLodaingScreen from "./ProductsLodaingScreen";

export default memo(function ProductList({ allProduct, isLoading,maxPrice,minPrice }) {
  return (
    <>
      {isLoading && <ProductsLodaingScreen />}
      {allProduct?.length === 0 && (
        <p className="text-gray-500 text-base text-center">
          No products found.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {allProduct?.map((product) => (
          <Product
            key={product.product_id}
            id={product.product_id}
            name={product.product_name}
            image={product.images[0].image_url}
            description={product.description}
            variantOne={product.variants[0]}
            variantTwo={product.variants[1]}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        ))}
      </div>
    </>
  );
});
