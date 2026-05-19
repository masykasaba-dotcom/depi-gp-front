import { memo, useRef } from "react";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import EditModal from "../../../shared/components/EditModal";
import useGetProfileData from "../../hooks/useGetProfileData";
import { Check } from "lucide-react";

export default memo(function AddressCard({
  id,
  isDefault,
  phone,
  streetAddress,
  city,
  state,
  zipCode,
  country,
  onDelete,
  onUpdate,
  onSetDefault,
}) {
  const deleteRef = useRef();
  const editRef = useRef();
  const { profileData } = useGetProfileData();

  function startDelete() {
    deleteRef.current.showModal();
  }
  function startEdit() {
    editRef.current.showModal();
  }
  async function finishDelete() {
    await onDelete(id);
  }
  async function finishEdit(updatedAddress) {
    await onUpdate(updatedAddress, id);
  }

  // Derive nickname/title based on index or simple heuristics, or default to Home/Office
  const addressTitle = isDefault ? "Home (Default)" : "Office";

  return (
    <>
      <ConfirmModal ref={deleteRef} onRemove={finishDelete} />
      <EditModal
        ref={editRef}
        defaultCity={city}
        defaultState={state}
        defaultStreetAddress={streetAddress}
        defaultZipCode={zipCode}
        onEdit={finishEdit}
      />
      <div className="rounded-2xl border border-[#E8E4DE] bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-display-lg text-[15px] font-semibold text-[#06373A]">
              {addressTitle}
            </h3>
            <div className="flex gap-1.5">
              <span className="bg-[#EAEAEA] text-[#444748] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-[4px]">
                SHIPPING
              </span>
              <span className="bg-[#EAEAEA] text-[#444748] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-[4px]">
                BILLING
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="font-body-md text-[13px] text-on-secondary-container leading-relaxed space-y-1 mb-6">
            <p className="font-semibold text-[#06373A]">
              {profileData ? `${profileData.first_name} ${profileData.last_name}` : " Eleanor Vance"}
            </p>
            <p className="text-[#555a5b]">{streetAddress}</p>
            <p className="text-[#555a5b]">{city}, {state} {zipCode}</p>
            <p className="text-[#555a5b]">{country}</p>
            <p className="text-[#555a5b] mt-3 flex items-center gap-1.5">
              <span className="opacity-60">📞</span> {phone}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#E8E4DE]/50 pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider mt-auto">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={startEdit}
              className="text-[#06373A] hover:text-[#032b26] transition underline underline-offset-4 cursor-pointer"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={startDelete}
              className="text-red-500 hover:text-red-700 transition underline underline-offset-4 cursor-pointer"
            >
              Remove
            </button>
          </div>

          {/* Default Selector */}
          <div>
            {isDefault ? (
              <div className="flex items-center gap-1.5 text-xs text-[#06373A] font-bold normal-case">
                <span className="w-5 h-5 rounded-full bg-[#06373A] flex items-center justify-center text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>Default</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onSetDefault && onSetDefault(id)}
                className="flex items-center gap-2 text-xs text-[#555a5b] hover:text-[#06373A] font-medium normal-case transition-colors"
              >
                <div className="w-4 h-4 rounded-full border border-outline-variant flex items-center justify-center" />
                <span>Set Default</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
