import React from "react";
import CustomInput from "./CustomInput";
import { useActionState } from "react";
import { isEmpty, validatPhone } from "../lib/validation";

export default function AddNewAddress({onAddNewAddress}) {
  async function AddAddressAction(prevState, formData) {
    const streetAddress = formData.get("STREET_ADDRESS");
    const phone = formData.get("PHONE");
    const city = formData.get("CITY");
    const state = formData.get("STATE");
    const country = formData.get("COUNTRY");
    const zipCode = formData.get("ZIP-CODE");
    const def = formData.get("DEFAULT");

    let errors = {
      streetAddressError: null,
      phoneError: null,
      cityError: null,
      stateError: null,
      countryError: null,
      zipCodeError: null,
    };

    if (isEmpty(streetAddress)) {
      errors.streetAddressError = "street address is requird";
    }

    if (!validatPhone(phone)) {
      errors.phoneError = "you must use an egyption number";
    }

    if (isEmpty(city)) {
      errors.cityError = "city is requird";
    }

    if (isEmpty(state)) {
      errors.stateError = "state is requird";
    }

    if (isEmpty(country)) {
      errors.countryError = "country is requird";
    }

    if (isEmpty(zipCode)) {
      errors.zipCodeError = "zip code is requird";
    }

    if (
      errors.streetAddressError ||
      errors.phoneError ||
      errors.cityError ||
      errors.stateError ||
      errors.countryError ||
      errors.zipCodeError
    ) {
      return {
        errors,
        savedValues: {
          streetAddress,
          phone,
          city,
          state,
          country,
          zipCode,
          def,
        },
      };
    }
    
    await onAddNewAddress({
      street_address : streetAddress,
      city,
      state,
      zip_code : zipCode,
      country,
      phone,
      is_default : def ? true : false
    })
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    return { errors: null };
  }
  const [formState, formAction, pending] = useActionState(AddAddressAction, {
    errors: null,
  });
  return (
    <div className="mt-16">
      <h2 className="mb-6 font-serif text-xl font-semibold text-base-content border-b border-base-300 pb-3">
        Add New Address
      </h2>
      <div className="rounded-2xl border border-base-300 bg-base-200/30 p-6 md:p-8 shadow-sm">
        <form className="space-y-4" action={formAction}>
          <CustomInput
            id="STREET_ADDRESS"
            name="STREET_ADDRESS"
            label="STREET ADDRESS"
            type="text"
            defaultValue={formState?.savedValues?.streetAddress}
            errorMessage={
              formState.errors && formState.errors.streetAddressError
            }
            placeholder="3 main street"
          />
          <CustomInput
            id="PHONE"
            name="PHONE"
            label="PHONE"
            type="tel"
            defaultValue={formState?.savedValues?.phone}
            errorMessage={formState.errors && formState.errors.phoneError}
            placeholder="01013625625"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <CustomInput
              id="CITY"
              name="CITY"
              label="CITY"
              type="text"
              defaultValue={formState?.savedValues?.city}
              errorMessage={formState.errors && formState.errors.cityError}
              placeholder="Tanta"
            />
            <CustomInput
              id="STATE"
              name="STATE"
              label="STATE"
              type="text"
              defaultValue={formState?.savedValues?.state}
              errorMessage={formState.errors && formState.errors.stateError}
              placeholder="Elgarbia"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <CustomInput
              id="COUNTRY"
              name="COUNTRY"
              label="COUNTRY"
              type="text"
              defaultValue={formState?.savedValues?.country}
              errorMessage={formState.errors && formState.errors.countryError}
              placeholder="Egypt"
            />
            <CustomInput
              id="ZIP-CODE"
              name="ZIP-CODE"
              label="ZIP CODE"
              type="tel"
              defaultValue={formState?.savedValues?.zipCode}
              errorMessage={formState.errors && formState.errors.zipCodeError}
              placeholder="31511"
            />
          </div>

          <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-base-content/80">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary rounded"
              name="DEFAULT"
              defaultChecked={!!formState?.savedValues?.def}
            />
            Set as default shipping address
          </label>

          <button
            type="submit"
            disabled={pending}
            className="btn btn-neutral w-full mt-8 rounded-xl text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {pending ? 'Saving' : 'Save Address'}
          </button>
        </form>
      </div>
    </div>
  );
}
