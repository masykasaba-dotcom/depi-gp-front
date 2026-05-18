import React, { useContext } from "react";
import useGetSkinProfile from "../hooks/useGetSkinProfile";
import useRecommendationsProducts from "../hooks/useRecommendationsProducts";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function SurveyResult() {
  const { data: skinProfileData, isLoading: profileLoading } = useGetSkinProfile();
  const { recommendationsProducts, isLoading: recLoading } = useRecommendationsProducts();
  const { handleAddProductToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // GET /profile/skin returns { data: skin_profile_object }
  const skinProfile = skinProfileData?.data;
  const recommendedItems = recommendationsProducts || [];

  const handleAddAllToBag = () => {
    if (recommendedItems.length === 0) return;
    const promises = recommendedItems.map(item => {
      const defaultVariant = item.variants?.[0];
      if (defaultVariant) {
        return handleAddProductToCart({ variant_id: defaultVariant.variant_id, quantity: 1 });
      }
      return Promise.resolve();
    });
    toast.promise(Promise.all(promises), {
      loading: 'Adding full protocol to bag...',
      success: 'Full protocol added to your bag!',
      error: 'Failed to add some items'
    });
  };

  const handleAddSingleToBag = (variantId) => {
    if (!variantId) return;
    handleAddProductToCart({ variant_id: variantId, quantity: 1 });
  };

  if (profileLoading || recLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24">
        <div className="mx-auto max-w-5xl px-6 animate-pulse">
          <div className="h-8 w-64 bg-[#EAEAEA] rounded mb-8"></div>
          <div className="h-32 bg-white border border-[#E8E4DE] rounded-xl mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-[#EAEAEA] rounded-xl"></div>
            <div className="h-64 bg-[#EAEAEA] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!skinProfile) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#06373A] mb-4">No Skin Profile Found</h2>
          <Link to="/profile/survey" className="text-[#06373A] font-bold hover:underline">
            Take the Skin Quiz
          </Link>
        </div>
      </div>
    );
  }

  const routineTotal = recommendedItems.reduce((acc, item) => {
    return acc + Number(item.variants?.[0]?.price || 0);
  }, 0);

  const amItems = recommendedItems.slice(0, Math.ceil(recommendedItems.length / 2));
  const pmItems = recommendedItems.slice(Math.ceil(recommendedItems.length / 2));

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 pb-48 relative">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 border-b border-[#E8E4DE] pb-12">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-4">
              LABORATORY REPORT // DIAGNOSTIC ANALYSIS
            </p>
            <h1 className="font-display-lg text-[40px] text-[#06373A] mb-4">
              Your Skin Dossier
            </h1>
            <p className="font-body-md text-[14px] text-[#555a5b] leading-relaxed">
              Based on your diagnostic results, we have engineered a highly targeted protocol to address your specific concerns and intensively nourish your skin barrier.
            </p>
          </div>

          {/* Skin Profile Summary */}
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <div className="flex gap-3">
              <div className="bg-white border border-[#E8E4DE] p-4 rounded-xl flex-1 md:w-40 shadow-sm">
                <p className="text-[9px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Skin Type</p>
                <p className="font-semibold text-[#06373A] text-[15px] capitalize">
                  {skinProfile.skin_type || "N/A"}
                </p>
              </div>
              <div className="bg-white border border-[#E8E4DE] p-4 rounded-xl flex-1 md:w-40 shadow-sm">
                <p className="text-[9px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Sensitivity</p>
                <p className="font-semibold text-[#06373A] text-[15px] capitalize">
                  {skinProfile.sensitivity_level || "N/A"}
                </p>
              </div>
            </div>
            {skinProfile.concerns?.length > 0 && (
              <div className="bg-white border border-[#E8E4DE] p-4 rounded-xl shadow-sm">
                <p className="text-[9px] font-bold tracking-wider uppercase text-[#555a5b] mb-2">Target Concerns</p>
                <div className="flex flex-wrap gap-2">
                  {skinProfile.concerns.map((concern, i) => (
                    <span key={i} className="bg-[#E8EFF0] text-[#06373A] text-[11px] font-semibold px-3 py-1 rounded-full capitalize">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Curated Protocol Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display-lg text-[24px] text-[#06373A]">Curated Protocol</h2>
          <span className="text-[12px] font-semibold text-[#555a5b]">
            {recommendedItems.length} products matched
          </span>
        </div>

        {recommendedItems.length === 0 ? (
          <div className="bg-white border border-[#E8E4DE] rounded-2xl p-12 text-center">
            <p className="text-[#555a5b] text-[15px] mb-2">No recommendations found for your skin profile.</p>
            <p className="text-[13px] text-[#aab7c4]">Try updating your quiz answers to get better matches.</p>
            <Link to="/profile/updateSurvey" className="inline-block mt-6 text-[#06373A] font-bold hover:underline">
              Update My Quiz
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* AM Protocol */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E8E4DE] pb-2 mb-6">
                <div className="flex items-center gap-2 text-[#06373A] font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  AM Protocol
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b]">Protect & Prevent</span>
              </div>
              <div className="space-y-4">
                {amItems.map((item, index) => {
                  const v = item.variants?.[0];
                  return (
                    <RecommendationCard
                      key={item.product_id}
                      item={item}
                      index={index}
                      step="PREPARE"
                      variant={v}
                      onAddToBag={() => handleAddSingleToBag(v?.variant_id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* PM Protocol */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E8E4DE] pb-2 mb-6">
                <div className="flex items-center gap-2 text-[#06373A] font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  PM Protocol
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b]">Repair & Renew</span>
              </div>
              <div className="space-y-4">
                {pmItems.map((item, index) => {
                  const v = item.variants?.[0];
                  return (
                    <RecommendationCard
                      key={item.product_id}
                      item={item}
                      index={index}
                      step="RENEW"
                      variant={v}
                      onAddToBag={() => handleAddSingleToBag(v?.variant_id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      {recommendedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E4DE] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">
                Complete Protocol
              </p>
              <p className="font-display-lg text-[20px] text-[#06373A]">
                Routine Total: <span className="font-bold">${routineTotal.toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={handleAddAllToBag}
              className="bg-[#032b26] text-white px-8 py-3 rounded-lg font-semibold text-[13px] tracking-widest uppercase hover:bg-[#06373A] transition-colors shadow-md flex items-center gap-2"
            >
              Add Full Protocol to Bag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ item, index, step, variant, onAddToBag }) {
  return (
    <div className="bg-white border border-[#E8E4DE] rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow relative group">
      {/* Match Score Badge */}
      {item.match_score > 0 && (
        <div className="absolute top-3 right-3 bg-[#E8EFF0] text-[#06373A] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {item.match_score}% match
        </div>
      )}

      <div className="w-16 h-24 bg-[#F5F5F5] rounded-md shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={item.primary_image || `https://placehold.co/100x150?text=${encodeURIComponent(item.product_name)}`}
          alt={item.product_name}
          className="h-full object-cover mix-blend-multiply"
          onError={(e) => { e.target.src = "https://placehold.co/100x150?text=Product"; }}
        />
      </div>

      <div className="flex flex-col justify-center flex-1 pr-8">
        <p className="text-[10px] font-bold tracking-wider uppercase text-[#aab7c4] mb-1">
          STEP 0{index + 1} // {step}
        </p>
        <h3 className="font-display-lg text-[16px] text-[#06373A] mb-1">{item.product_name}</h3>
        <p className="font-body-md text-[11px] text-[#555a5b] line-clamp-2 mb-2">
          {item.description || item.reason || "Clinically formulated active."}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-[#06373A] text-[13px]">
            ${variant?.price || "0.00"}
          </span>
          <button
            onClick={onAddToBag}
            disabled={!variant}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold uppercase text-[#06373A] border border-[#06373A] px-3 py-1 rounded hover:bg-[#06373A] hover:text-white disabled:opacity-30"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
