import ReactPaginate from "react-paginate";
import useGetAllProducts from "../hooks/useGetAllProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity, faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductList from "../components/productList";
export default function ProductsPage() {
  const {
    allProduct,
    handleUpdatePageNumber,
    isLoading,
    pageNumber,
    pages,
    handleUpdateCategory,
    category,
    handleSearch,
    search,
    handleUpdatePrice,
    maxAndMinPrice,
  } = useGetAllProducts();

  return (
    <section className="bg-base-100 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-10 text-center md:text-left">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
            LUMIÈRE Catalog
          </p>
          <h1 className="font-serif text-3xl font-light text-base-content md:text-5xl">
            All Products
          </h1>
          <p className="mt-3 text-base-content/70">
            Browse our complete collection of scientifically formulated
            skincare.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          {/* FILTERS SIDEBAR */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content mb-4">
                Categories
              </h3>
              <ul className="space-y-2 text-sm text-base-content/70">
                <li
                  onClick={() => handleUpdateCategory("")}
                  className={`flex justify-between cursor-pointer ${category === "" && "text-primary"}`}
                >
                  <span className="font-medium">All</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Toners")}
                  className={`flex justify-between cursor-pointer ${category === "Toners" && "text-primary"}`}
                >
                  <span>Toners</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Exfoliators")}
                  className={`flex justify-between cursor-pointer ${category === "Exfoliators" && "text-primary"}`}
                >
                  <span>Exfoliators</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Eye Care")}
                  className={`flex justify-between cursor-pointer ${category === "Eye Care" && "text-primary"}`}
                >
                  <span>Eye Care</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Sun Protection")}
                  className={`flex justify-between cursor-pointer ${category === "Sun Protection" && "text-primary"}`}
                >
                  <span>Sun Protection</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Masks")}
                  className={`flex justify-between cursor-pointer ${category === "Masks" && "text-primary"}`}
                >
                  <span>Masks</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Cleansers")}
                  className={`flex justify-between cursor-pointer ${category === "Cleansers" && "text-primary"}`}
                >
                  <span>Cleansers</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Moisturizers")}
                  className={`flex justify-between cursor-pointer ${category === "Moisturizers" && "text-primary"}`}
                >
                  <span>Moisturizers</span>
                </li>
                <li
                  onClick={() => handleUpdateCategory("Serums")}
                  className={`flex justify-between cursor-pointer ${category === "Serums" && "text-primary"}`}
                >
                  <span>Serums</span>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content mb-4">
                Skin Concern
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-base-content/80">
                  <input type="checkbox" className="checkbox checkbox-sm" />{" "}
                  Hydration
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-base-content/80">
                  <input type="checkbox" className="checkbox checkbox-sm" />{" "}
                  Anti-Aging
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-base-content/80">
                  <input type="checkbox" className="checkbox checkbox-sm" />{" "}
                  Brightening
                </label>
              </div>
            </div> */}
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            <div className="relative w-full">
              <input
                onChange={(event) => handleSearch(event.target.value)}
                type="search"
                placeholder="Search..."
                className="w-full py-3 pl-10 pr-4 text-base border border-gray-200 rounded-lg outline-none transition-all duration-200 placeholder:text-gray-400 "
                defaultValue={search}
              />

              {/* Icon */}
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>
            <div className="flex justify-between items-center mb-6 border-b border-base-300 pb-4 mt-4">
              <p className="text-sm text-base-content/60">
                Showing 1-6 of 24 products
              </p>
              <select
                className="select select-sm bg-base-200 border-none text-base-content"
                value={`${maxAndMinPrice.minPrice}-${maxAndMinPrice.maxPrice}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split("-");
                  handleUpdatePrice(min, max);
                }}
              >
                <option value="-">Sort by</option>
                <option value="-25">Sort by: Price (0 → 25)</option>
                <option value="25-50">Sort by: Price (25 → 50)</option>
                <option value="50-">Sort by: Price (50 → ∞)</option>
              </select>
            </div>

            <ProductList
              maxPrice={maxAndMinPrice.maxPrice}
              minPrice={maxAndMinPrice.minPrice}
              allProduct={allProduct}
              isLoading={isLoading}
            />
            <ReactPaginate
              breakLabel="..."
              nextLabel="›"
              previousLabel="‹"
              onPageChange={handleUpdatePageNumber}
              pageRangeDisplayed={3} // 👈 smaller on mobile
              marginPagesDisplayed={pageNumber}
              pageCount={pages}
              forcePage={pageNumber - 1}
              containerClassName="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-8"
              pageClassName="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-m border border-gray-300 hover:border-black transition"
              activeClassName="bg-black text-white border-black"
              previousClassName="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md border border-gray-300"
              nextClassName="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md border border-gray-300"
              breakClassName="px-1 text-gray-400 text-xs"
              disabledClassName="opacity-40 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
console.log("50-".split('-'))