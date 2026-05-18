import React, { useState } from "react";
import useIngredients from "../hooks/useIngredients";
import { Link } from "react-router";
import { Search } from "lucide-react";

export default function IngredientsGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Simple debounce for search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, isError } = useIngredients(1, 100, debouncedSearch);

  return (
    <section className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display-lg text-[40px] text-[#06373A] mb-4">
            Scientific Glossary
          </h1>
          <p className="font-body-md text-[15px] text-[#555a5b] leading-relaxed">
            Transparency in formulation. Explore our active ingredients, clinical functions, and the rigorous research behind our Science-meets-Beauty philosophy.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#555a5b]">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by ingredient or clinical function..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-[#E8E4DE] bg-white text-[15px] text-[#06373A] outline-none focus:border-[#06373A] focus:ring-1 focus:ring-[#06373A] transition-all shadow-sm"
          />
        </div>

        {/* State Handling */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-white border border-[#E8E4DE] rounded-2xl shadow-sm"></div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 text-red-600 font-body-md">
            Failed to load ingredients. Please try again later.
          </div>
        )}

        {/* Ingredients Grid */}
        {!isLoading && !isError && data?.data && (
          <>
            {data.data.length === 0 ? (
              <div className="text-center py-12 text-[#555a5b] font-body-md">
                No ingredients found matching "{searchTerm}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.map((ingredient) => (
                  <div 
                    key={ingredient.ingredient_id} 
                    className="bg-white border border-[#E8E4DE] rounded-xl p-8 hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <div className="w-6 h-0.5 bg-[#aab7c4] mb-6"></div>
                    <h3 className="font-display-lg text-[20px] font-semibold text-[#06373A] mb-1">
                      {ingredient.name}
                    </h3>
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#555a5b] mb-4">
                      {ingredient.benefits || ingredient.concerns || "Active Compound"}
                    </p>
                    <p className="font-body-md text-[13px] text-[#555a5b] leading-relaxed mb-8 flex-1">
                      {ingredient.description}
                    </p>
                    <Link 
                      to={`/ingredients/${ingredient.ingredient_id}`} 
                      className="text-[12px] font-semibold tracking-wider uppercase text-[#06373A] hover:text-[#032b26] flex items-center gap-2 mt-auto"
                    >
                      View Full Research <span>→</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
