import ReactPaginate from "react-paginate";
import useGetAllProducts from "../hooks/useGetAllProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductList from "../features/products/ProductList";

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
    <main className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop pt-16 pb-section-gap">
      {/* Hero / Page Header */}
      <header className="mb-16">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 text-primary uppercase tracking-tighter">
          Clinical Formulations
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Advanced dermatological solutions engineered for professional efficacy
          and sensory refinement. Explore our catalog of science-backed
          essentials.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="md:sticky md:top-32 space-y-12">
            <div className="filter-group">
              <h3 className="font-label-caps text-[12px] mb-8 text-primary tracking-[0.3em] uppercase border-b border-outline-variant pb-2">
                Skin Category
              </h3>
              <div className="flex flex-col gap-5">
                {[
                  { value: "", label: "All Formulations" },
                  { value: "Toners", label: "Toners" },
                  { value: "Exfoliators", label: "Exfoliators" },
                  { value: "Eye Care", label: "Eye Care" },
                  { value: "Sun Protection", label: "Sun Protection" },
                  { value: "Masks", label: "Masks" },
                  { value: "Cleansers", label: "Cleansers" },
                  { value: "Moisturizers", label: "Moisturizers" },
                  { value: "Serums", label: "Serums" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleUpdateCategory(item.value)}
                    className="flex items-center justify-between group cursor-pointer text-left"
                  >
                    <span
                      className={`font-body-md text-sm tracking-wide transition-all duration-300 ${
                        category === item.value
                          ? "text-primary font-bold translate-x-1"
                          : "text-on-surface-variant group-hover:text-primary group-hover:translate-x-1"
                      }`}
                    >
                      {item.label}
                    </span>
                    {category === item.value && (
                      <div className="w-1 h-4 bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-8 mb-16">
            <div className="relative w-full sm:w-96">
              <label className="font-label-caps text-[10px] text-outline uppercase tracking-widest mb-2 block">Search Catalog</label>
              <div className="relative">
                <input
                  onChange={(event) => handleSearch(event.target.value)}
                  type="text"
                  placeholder="Enter keywords..."
                  className="w-full py-3 pl-0 border-0 border-b border-outline-variant bg-transparent text-sm md:text-base font-body-md outline-none focus:ring-0 focus:border-primary transition-colors accent-primary"
                  defaultValue={search}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-outline pointer-events-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[200px]">
              <span className="font-label-caps text-[10px] tracking-widest text-outline uppercase">
                Sort by Price
              </span>
              <select
                className="border-0 border-b border-outline-variant bg-transparent text-sm md:text-base font-body-md py-3 pl-0 pr-8 outline-none focus:ring-0 focus:border-primary transition-colors cursor-pointer appearance-none accent-primary"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1rem' }}
                value={`${maxAndMinPrice.minPrice}-${maxAndMinPrice.maxPrice}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split("-");
                  handleUpdatePrice(min, max);
                }}
              >
                <option value="-">Default Order</option>
                <option value="-25">Below $25</option>
                <option value="25-50">$25 — $50</option>
                <option value="50-">Above $50</option>
              </select>
            </div>
          </div>


          <div className="min-h-[600px]">
            <ProductList
              maxPrice={maxAndMinPrice.maxPrice}
              minPrice={maxAndMinPrice.minPrice}
              allProduct={allProduct}
              isLoading={isLoading}
            />
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel={<span className="material-symbols-outlined text-[18px]">chevron_right</span>}
            previousLabel={<span className="material-symbols-outlined text-[18px]">chevron_left</span>}
            onPageChange={handleUpdatePageNumber}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pages}
            forcePage={pageNumber - 1}
            containerClassName="flex items-center justify-center gap-3 mt-20"
            pageClassName="min-w-[40px] h-10 flex items-center justify-center border border-outline-variant bg-transparent text-sm font-label-caps hover:border-primary transition-colors cursor-pointer"
            activeClassName="bg-primary text-on-primary border-primary"
            previousClassName="min-w-[40px] h-10 flex items-center justify-center border border-outline-variant bg-transparent text-sm hover:border-primary transition-colors cursor-pointer"
            nextClassName="min-w-[40px] h-10 flex items-center justify-center border border-outline-variant bg-transparent text-sm hover:border-primary transition-colors cursor-pointer"
            breakClassName="px-2 text-outline text-sm"
            disabledClassName="opacity-30 cursor-not-allowed pointer-events-none"
          />
        </div>
      </div>
    </main>
  );
}
