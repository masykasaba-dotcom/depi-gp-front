import RecomProductCard from "./RecomProductCard";
import ProductsLodaingScreen from "./ProductsLodaingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowRightLong, faFile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import useRecommendationsProducts from "../hooks/useRecommendationsProducts";

export default function RecommendationsProducts() {
  const { isError, isLoading, recommendationsProducts } =
    useRecommendationsProducts();
  return (
    <div className="px-4 md:px-8 my-6">
      <div className="border-b border-base-300 pb-4 mb-5 flex justify-between items-end flex-wrap">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-base-content tracking-tight">
            Skincare Tailored to You
          </h3>
          <p className="text-base text-base-content/70 mt-2 leading-relaxed">
            Thoughtfully selected products designed to support your skin type,
            concerns, and daily routine.
          </p>
        </div>
        {!isLoading && !isError && <Link
          to="/profile/updateSurvey"
          className="group inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary transition-all duration-200"
        >
          Update Skin Analysis
          <FontAwesomeIcon icon={faArrowRightLong}  className="transform transition-transform duration-200 group-hover:translate-x-1"/>
        </Link>}
      </div>
      {isError && (
        <div className=" mt-10">
          <div className="rounded-2xl md:p-8 text-center">
            {/* Icon */}
            <div className="mx-auto mb-4 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faFile} className="text-2xl " />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-base-content">
              Personalized Recommendations Unavailable
            </h3>

            {/* Description */}
            <p className="text-sm text-base-content/70 mt-2  mx-auto leading-relaxed">
              Complete your skin analysis to unlock products tailored
              specifically to your skin type and concerns.
            </p>

            {/* CTA */}
            <Link
              to="/profile/survey"
              className="mt-5 block w-fit mx-auto px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Start Skin Analysis
            </Link>
          </div>
        </div>
      )}
      {isLoading && <ProductsLodaingScreen />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {!isLoading &&
          !isError &&
          recommendationsProducts?.map((product) => (
            <RecomProductCard product={product} />
          ))}
      </div>
    </div>
  );
}
