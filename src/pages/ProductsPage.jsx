import ReactPaginate from "react-paginate";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useGetCategories from "../hooks/useGetCategories";
import ProductList from "../features/products/ProductList";

export default function ProductsPage() {
  const {
    allProduct,
    handleUpdatePageNumber,
    isLoading: isProductsLoading,
    pageNumber,
    pages,
    handleUpdateCategory,
    category,
    handleSearch,
    search,
    handleUpdatePrice,
    maxAndMinPrice,
  } = useGetAllProducts();

  const { categories, isLoading: isCategoriesLoading } = useGetCategories();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close custom sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { value: "-", label: "Sort by: Recommended" },
    { value: "-25", label: "Price: Under $25" },
    { value: "25-50", label: "Price: $25 - $50" },
    { value: "50-", label: "Price: Over $50" },
  ];

  const currentSortValue = `${maxAndMinPrice.minPrice}-${maxAndMinPrice.maxPrice}`;
  const currentSortLabel = sortOptions.find(opt => opt.value === currentSortValue)?.label || "Sort by: Recommended";

  return (
    <main className="max-w-[1440px] mx-auto px-5 lg:px-12 pt-28 pb-24 animate-fade-in-up">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] text-[#555a5b] mb-10 font-sans">
        <Link to="/" className="hover:text-[#06373A] transition-colors">Home</Link>
        <span className="text-[#a8d5b5]">›</span>
        <span className="text-[#06373A] font-semibold">Shop All</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* ─── Left Sidebar (Filters) ─── */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e8ecee]">
              <h2 className="font-sans text-[13px] font-bold tracking-[0.15em] text-[#06373A] uppercase">
                Filters
              </h2>
              <button 
                onClick={() => handleUpdateCategory("")}
                className="text-[11px] font-semibold text-[#555a5b] uppercase hover:text-[#06373A] transition-colors tracking-wider"
              >
                Clear All
              </button>
            </div>

            {/* Filter Group (Accordion style) */}
            <div className="mb-8">
              <button className="flex items-center justify-between w-full mb-5 group">
                <h3 className="font-sans text-[14px] font-semibold text-[#06373A]">
                  Category
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#555a5b] group-hover:text-[#06373A] transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              
              <div className="flex flex-col gap-3.5">
                {isCategoriesLoading ? (
                  // Loading skeletons for categories
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-[3px] bg-[#e8ecee] animate-pulse"></div>
                      <div className="h-3.5 bg-[#e8ecee] animate-pulse rounded w-24"></div>
                    </div>
                  ))
                ) : (
                  categories.map((item) => {
                    const isActive = category === item.value;
                    return (
                      <label 
                        key={item.label}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${isActive ? 'bg-[#04362E] border-[#04362E]' : 'border-[#d0d5d8] group-hover:border-[#04362E]'}`}>
                          {isActive && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={isActive}
                          onChange={() => handleUpdateCategory(isActive ? "" : item.value)}
                        />
                        <span className={`text-[14px] font-sans transition-colors flex items-center gap-1.5 ${isActive ? 'text-[#06373A] font-medium' : 'text-[#555a5b] group-hover:text-[#06373A]'}`}>
                          {item.label} <span className="text-[#a1a5a6] text-[12px]">({item.count})</span>
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </aside>

        {/* ─── Main Content Area ─── */}
        <div className="flex-1 flex flex-col">
          
          {/* Header & Sort Controls */}
          <header className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 pb-8 border-b border-[#e8ecee]">
            <div className="max-w-2xl">
              <h1 className="font-serif text-[32px] md:text-[40px] text-[#06373A] mb-4 leading-tight">
                Shop All Skincare
              </h1>
              <p className="font-sans text-[15px] text-[#555a5b] leading-relaxed">
                Clinically proven formulations engineered for optimal skin health. Discover our range of targeted treatments, daily essentials, and transformative complexes.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-3 min-w-[220px]">
              {/* Search Bar */}
              <div className="relative">
                <input
                  onChange={(event) => handleSearch(event.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-11 pl-4 pr-10 border border-[#d0d5d8] rounded-lg bg-[#f4f7f9]/50 text-sm font-sans outline-none focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E] transition-all"
                  defaultValue={search}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a5a6]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>

              {/* Custom Sort Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={`w-full h-11 pl-4 pr-10 border rounded-lg bg-white text-[13px] font-sans font-medium text-[#06373A] outline-none transition-all flex items-center text-left ${isSortOpen ? 'border-[#04362E] ring-1 ring-[#04362E]' : 'border-[#d0d5d8]'}`}
                >
                  <span className="truncate">{currentSortLabel}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555a5b] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isSortOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-[#e8ecee] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden animate-fade-in-up origin-top">
                    <ul className="py-1">
                      {sortOptions.map((option) => (
                        <li key={option.value}>
                          <button
                            className={`w-full text-left px-4 py-2.5 text-[13px] font-sans transition-colors ${currentSortValue === option.value ? 'bg-[#f4f7f9] text-[#06373A] font-semibold' : 'text-[#555a5b] hover:bg-[#f4f7f9] hover:text-[#06373A]'}`}
                            onClick={() => {
                              const [min, max] = option.value.split("-");
                              handleUpdatePrice(min, max);
                              setIsSortOpen(false);
                            }}
                          >
                            {option.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Active Filters Tag (Mockup style) */}
          {category && (
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[13px] font-medium text-[#555a5b]">Active Filters:</span>
              <button 
                onClick={() => handleUpdateCategory("")}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f7f9] border border-[#d0d5d8] rounded-full text-[13px] font-medium text-[#06373A] hover:bg-[#e8ecee] transition-colors group"
              >
                {category}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[#a1a5a6] group-hover:text-[#06373A] transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button 
                onClick={() => handleUpdateCategory("")}
                className="text-[12px] text-[#555a5b] underline underline-offset-2 hover:text-[#06373A]"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 min-h-[600px]">
            <ProductList
              maxPrice={maxAndMinPrice.maxPrice}
              minPrice={maxAndMinPrice.minPrice}
              allProduct={allProduct}
              isLoading={isProductsLoading}
            />
          </div>

          {/* Pagination */}
          <ReactPaginate
            breakLabel="..."
            nextLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>}
            previousLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>}
            onPageChange={handleUpdatePageNumber}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pages}
            forcePage={pageNumber - 1}
            containerClassName="flex items-center justify-center gap-2 mt-20 pt-10 border-t border-[#e8ecee]"
            pageClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-transparent text-[14px] font-medium text-[#555a5b] hover:bg-[#f4f7f9] transition-colors cursor-pointer"
            activeClassName="!bg-[#04362E] !text-white !border-[#04362E]"
            previousClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e8ecee] text-[#555a5b] hover:bg-[#f4f7f9] transition-colors cursor-pointer"
            nextClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e8ecee] text-[#555a5b] hover:bg-[#f4f7f9] transition-colors cursor-pointer"
            breakClassName="px-2 text-[#a1a5a6]"
            disabledClassName="opacity-40 cursor-not-allowed hover:bg-transparent"
          />
        </div>

      </div>
    </main>
  );
}
