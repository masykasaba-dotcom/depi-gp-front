import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import useGetCategoriesData from "../hooks/useGetCategoriesData";

// A curated visual identity for each category
const CATEGORY_THEMES = {
  Serums: {
    gradient: "from-[#0a2e2b] to-[#1a5c55]",
    accent: "#a8d5b5",
    tag: "Treatment",
  },
  Moisturizers: {
    gradient: "from-[#2d1b0e] to-[#6b3a1f]",
    accent: "#e8c9a0",
    tag: "Hydration",
  },
  Cleansers: {
    gradient: "from-[#0d2b3e] to-[#1a5276]",
    accent: "#a9cce3",
    tag: "Cleanse",
  },
  Masks: {
    gradient: "from-[#1a0a2e] to-[#4a1c6b]",
    accent: "#c9a8e8",
    tag: "Intensive",
  },
  "Sun Protection": {
    gradient: "from-[#2e2200] to-[#6b5000]",
    accent: "#f5d78e",
    tag: "SPF Shield",
  },
  "Eye Care": {
    gradient: "from-[#0a2a2e] to-[#0d5460]",
    accent: "#a0d9e0",
    tag: "Targeted",
  },
  Exfoliators: {
    gradient: "from-[#2e1a0a] to-[#6b3d10]",
    accent: "#e8b89a",
    tag: "Renew",
  },
  Toners: {
    gradient: "from-[#0e2e1a] to-[#1e5c36]",
    accent: "#a8e0b5",
    tag: "Balance",
  },
};

const DEFAULT_THEME = {
  gradient: "from-[#1a1a2e] to-[#2d2d4a]",
  accent: "#c9c6c5",
  tag: "Skincare",
};

function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface-container animate-pulse h-64" />
  );
}

export default function CategoriesPage() {
  const { categories, isLoading, isError } = useGetCategoriesData();

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 lg:py-24 animate-fade-in">
      
      {/* ── Breadcrumbs ── */}
      <nav className="flex items-center gap-3 mb-12 font-label-caps text-[10px] text-on-secondary-container tracking-widest uppercase">
        <Link to="/" className="hover:text-[#06373A] transition-colors">Home</Link>
        <span className="text-outline-variant">/</span>
        <span className="text-[#06373A]">Categories</span>
      </nav>

      {/* ── Header ── */}
      <div className="mb-16 animate-fade-in-up">
        <p className="font-label-caps text-[10px] tracking-[0.3em] text-[#06373A] uppercase mb-3">
          Explore the Collection
        </p>
        <h1 className="font-display-lg text-[42px] md:text-[56px] text-[#06373A] leading-tight mb-5">
          Shop by Category
        </h1>
        <p className="font-body-md text-[15px] text-on-secondary-container max-w-xl leading-relaxed">
          Explore our clinically curated skincare lines — each category precision-
          formulated to address a specific aspect of your skin's health and vitality.
        </p>
      </div>

      {/* ── Error State ── */}
      {isError && (
        <div className="text-center py-20">
          <p className="text-on-secondary-container text-[15px]">
            Something went wrong. Please try again later.
          </p>
        </div>
      )}

      {/* ── Category Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          : categories.map((cat, idx) => {
              const theme = CATEGORY_THEMES[cat.category_name] || DEFAULT_THEME;
              return (
                <Link
                  key={cat.category_id}
                  to={`/products?category=${encodeURIComponent(cat.category_name)}`}
                  onClick={() => sessionStorage.setItem("category", cat.category_name)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 min-h-[260px] cursor-pointer animate-fade-in-up transition-transform duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* Background Image or Gradient */}
                  {cat.preview_image ? (
                    <div className="absolute inset-0 bg-[#f8f9fa]">
                      <img 
                        src={cat.preview_image} 
                        alt={cat.category_name}
                        className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay for text readability */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-[#06373A]/90 via-[#06373A]/40 to-transparent`} />
                    </div>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} transition-opacity duration-500`} />
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.4)_0%,_transparent_70%)]" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white blur-2xl rounded-full scale-75" />
                    </>
                  )}

                  {/* ── Top Row ── */}
                  <div className="relative z-10 flex items-start justify-between">
                    {/* Tag badge */}
                    <span
                      className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border bg-white/10 backdrop-blur-sm"
                      style={{ color: theme.accent, borderColor: `${theme.accent}50` }}
                    >
                      {theme.tag}
                    </span>
                  </div>

                  {/* ── Bottom: Title, description, arrow ── */}
                  <div className="relative z-10 flex flex-col gap-2 mt-auto pt-6">
                    <h2 className="font-display-lg text-[22px] text-white leading-snug">
                      {cat.category_name}
                    </h2>
                    <p className="font-body-md text-[12px] leading-relaxed line-clamp-2 text-white/60">
                      {cat.description}
                    </p>
                    <div
                      className="flex items-center gap-2 mt-3 text-[11px] font-semibold tracking-widest uppercase transition-gap duration-300"
                      style={{ color: theme.accent }}
                    >
                      <span>Shop Now</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="mt-20 pt-10 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up">
        <div>
          <h3 className="font-display-lg text-[22px] text-[#06373A] mb-1">
            Not sure where to start?
          </h3>
          <p className="font-body-md text-[14px] text-on-secondary-container">
            Take our skin analysis quiz and get a personalized routine.
          </p>
        </div>
        <Link
          to="/profile/survey"
          className="flex items-center gap-2 px-8 py-3.5 bg-[#032b26] text-white rounded-full font-body-md text-[13px] font-medium hover:bg-[#06373A] transition-colors whitespace-nowrap"
        >
          Take the Quiz
          <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}
