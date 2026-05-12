import React from "react";
import CustomInput from "./CustomInput";
import { useActionState } from "react";
import { isEmpty } from "../lib/validation";

export default function EditModal({
  ref,
  defaultStreetAddress,
  defaultCity,
  defaultState,
  defaultZipCode,
  onEdit,
}) {
  async function editAddressAciton(prevState, formData) {
    const streetAddress = formData.get("streetAddress");
    const city = formData.get("city");
    const state = formData.get("state");
    const zipCode = formData.get("zipCode");

    let errors = {
      streerAddressError: null,
      cityError: null,
      stateError: null,
      zipCodeError: null,
    };

    if (isEmpty(streetAddress)) {
      errors.streerAddressError = "street address is required";
    }

    if (isEmpty(city)) {
      errors.cityError = "city is required";
    }

    if (isEmpty(state)) {
      errors.stateError = "state is required";
    }

    if (isEmpty(zipCode)) {
      errors.zipCodeError = "zip code is required";
    }

    if (
      errors.streerAddressError ||
      errors.cityError ||
      errors.stateError ||
      errors.zipCodeError
    ) {
      return {
        errors,
        savedValues: {
          streetAddress,
          city,
          state,
          zipCode,
        },
      };
    }

    await onEdit({
      street_address : streetAddress,
      city,
      state,
      zip_code : zipCode,
    });

    ref.current.close()
    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(editAddressAciton, {
    errors: null,
  });

  return (
    <dialog id="my_modal_1" className="modal" ref={ref}>
      <div className="modal-box max-w-md">
        {/* Title */}
        <h3 className="font-bold text-xl mb-4">Edit Address</h3>

        {/* Form */}
        <form action={formAction} method="dialog" className="space-y-4">
          <CustomInput
            label="Street Address"
            id="streetAddress"
            name="streetAddress"
            defaultValue={
              formState.savedValues
                ? formState.savedValues?.streetAddress
                : defaultStreetAddress
            }
            errorMessage={
              formState.errors && formState.errors.streerAddressError
            }
          />

          <CustomInput
            label="City"
            id="city"
            name="city"
            defaultValue={
              formState.savedValues ? formState.savedValues?.city : defaultCity
            }
            errorMessage={formState.errors && formState.errors.cityError}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <CustomInput
              label="State"
              id="state"
              name="state"
              defaultValue={
                formState.savedValues
                  ? formState.savedValues?.state
                  : defaultState
              }
              errorMessage={formState.errors && formState.errors.stateError}
            />
            <CustomInput
              label="Zip Code"
              id="zipCode"
              name="zipCode"
              defaultValue={
                formState.savedValues
                  ? formState.savedValues?.zipCode
                  : defaultZipCode
              }
              errorMessage={formState.errors && formState.errors.zipCodeError}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => ref.current.close()}
              className="btn btn-ghost"
              type="button"
            >
              Cancel
            </button>

            <button disabled={pending} className="btn btn-primary" type="submit">
              {pending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
