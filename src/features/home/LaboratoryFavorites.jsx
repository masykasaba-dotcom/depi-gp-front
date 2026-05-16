import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import useLaboratoryFavorites from "../../hooks/useLaboratoryFavorites";
import ProductList from "../products/ProductList";

export default function LaboratoryFavorites() {
  const { isLoading, someProduct } = useLaboratoryFavorites();
  return (
    <section className="bg-[#f9f9f9] py-16 md:py-24">
      <div className="max-w-[1440px] px-6 lg:px-16 mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end flex-wrap gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-[32px] text-black mb-2">
              Laboratory Favorites
            </h2>
            <p className="font-sans text-sm md:text-base text-[#444748] max-w-md">
              Our most advanced formulations for transformative results, tested
              in rigorous clinical environments.
            </p>
          </div>
          <div>
            <Link
              to="/products"
              className="font-sans text-[10px] md:text-[11px] font-bold text-black border-b border-[#c4c7c7] md:border-black uppercase tracking-[0.2em] pb-1 hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              VIEW ALL FORMULATIONS{" "}
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </Link>
          </div>
        </header>
        <ProductList allProduct={someProduct} isLoading={isLoading} />
      </div>
    </section>
  );
}
