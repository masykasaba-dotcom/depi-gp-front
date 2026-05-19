import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import useLaboratoryFavorites from "../../hooks/useLaboratoryFavorites";
import ProductList from "../products/ProductList";

export default function LaboratoryFavorites() {
  const { isLoading, someProduct } = useLaboratoryFavorites();
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1440px] px-6 lg:px-16 mx-auto">

        {/* Section header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#06373A] mb-2 block">
              Curated Formulations
            </span>
            <h2 className="font-serif text-[32px] md:text-[40px] text-[#06373A] mb-2">
              Laboratory Favorites
            </h2>
            <p className="text-[#555a5b] text-sm md:text-base max-w-md">
              Our most advanced formulations for transformative results, tested
              in rigorous clinical environments.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#04362E] border border-[#04362E]/30 rounded-lg px-5 py-2.5 hover:bg-[#04362E]/5 transition-colors whitespace-nowrap"
          >
            View All Formulations
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </header>

        <ProductList allProduct={someProduct} isLoading={isLoading} />
      </div>
    </section>
  );
}

