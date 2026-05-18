import AddNewAddress from "../features/profile/AddNewAddress";
import AddressCard from "../features/profile/AddressCard";
import { useState } from "react";
import useAddresses from "../hooks/useAddresses";
import AccountLayout from "../layouts/AccountLayout";

export default function Addresses() {
  const {
    addresses,
    handleAddAddress,
    handleDeleteAddress,
    handleUpdateAddress,
    handleSetDefaultAddress,
    isError,
    isLoading
  } = useAddresses();
  
  const [showAddNewAddresse, setShowAddNewAddresse] = useState(false);

  function handleShowForm() {
    setShowAddNewAddresse((prevState) => !prevState);
  }

  return (
    <AccountLayout>
      <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8E4DE]/50 pb-6 mb-8">
          <div>
            <h2 className="font-display-lg text-[22px] text-[#06373A] leading-tight mb-1.5">
              Saved Addresses
            </h2>
            <p className="font-body-md text-[13px] text-on-secondary-container">
              Manage your shipping and billing locations.
            </p>
          </div>
          <button
            onClick={handleShowForm}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#032b26] text-white hover:bg-[#06373A] text-xs font-semibold uppercase tracking-widest rounded-lg transition-colors whitespace-nowrap"
          >
            <span className="text-sm">+</span> Add New Address
          </button>
        </div>

        {/* Addresses list and grid */}
        {isLoading && <AddressesSkeleton />}
        {isError && <AddressesError />}

        {!isLoading && !isError && (
          <>
            {addresses?.length === 0 && !showAddNewAddresse && (
              <div className="text-center py-16 border border-dashed border-[#E8E4DE] rounded-2xl">
                <p className="font-body-md text-[14px] text-on-secondary-container mb-4">
                  You haven’t added any addresses yet.
                </p>
                <button
                  onClick={handleShowForm}
                  className="px-4 py-2 border border-[#06373A] text-[#06373A] hover:bg-[#06373A]/5 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors"
                >
                  Create Your First Address
                </button>
              </div>
            )}

            {addresses?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.address_id}
                    id={address.address_id}
                    city={address.city}
                    country={address.country}
                    isDefault={address.is_default}
                    phone={address.phone}
                    state={address.state}
                    streetAddress={address.street_address}
                    zipCode={address.zip_code}
                    onDelete={handleDeleteAddress}
                    onUpdate={handleUpdateAddress}
                    onSetDefault={handleSetDefaultAddress}
                  />
                ))}

                {/* Dotted "Add Another Address" Card */}
                {addresses.length < 5 && (
                  <div
                    onClick={handleShowForm}
                    className="rounded-2xl border border-dashed border-[#C9C6C5] bg-[#FAF9F6]/50 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#06373A]/5 hover:border-[#06373A] transition duration-300 min-h-[220px]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center text-on-secondary-container mb-3 text-lg font-semibold">
                      ➕
                    </div>
                    <p className="font-display-lg text-[14px] font-semibold text-[#06373A] mb-1">
                      Add Another Address
                    </p>
                    <p className="font-body-md text-[11px] text-on-secondary-container">
                      Save multiple locations for quicker checkout.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Add Address Form Section */}
        {showAddNewAddresse && (
          <div className="border-t border-[#E8E4DE]/50 pt-8 mt-8 animate-fade-in-up">
            <AddNewAddress onAddNewAddress={async (newAddr) => {
              await handleAddAddress(newAddr);
              setShowAddNewAddresse(false);
            }} />
          </div>
        )}
      </div>
    </AccountLayout>
  );
}

function AddressesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-[#E8E4DE] bg-white p-6 shadow-sm min-h-[200px]">
          <div className="h-4 w-24 bg-[#EAEAEA] rounded mb-3" />
          <div className="h-5 w-40 bg-[#EAEAEA] rounded mb-2" />
          <div className="h-4 w-56 bg-[#EAEAEA] rounded mb-1" />
          <div className="h-4 w-48 bg-[#EAEAEA] rounded" />
        </div>
      ))}
    </div>
  );
}

function AddressesError() {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="font-display-lg text-[15px] font-semibold text-red-700 mb-1">
        Failed to load addresses
      </p>
      <p className="font-body-md text-[13px] text-red-600">
        Something went wrong. Please reload or try again later.
      </p>
    </div>
  );
}
