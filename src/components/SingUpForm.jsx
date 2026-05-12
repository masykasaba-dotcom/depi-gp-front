import CustomInput from "./CustomInput";
import { useActionState, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import SubmitFormButton from "./SubmitFormButton";
import useSignUp from "../hooks/useSignUp";

export default function SingUpForm() {
  const {formAction,formState,errorMessage} = useSignUp()

  return (
    <form action={formAction}>
      {errorMessage && (
        <div className="border border-red-300 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
          {errorMessage}
        </div>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            id={"firstname"}
            label={"FIRST NAME"}
            type={"text"}
            name="first_name"
            placeholder="Mohamed"
            defaultValue={formState?.savedValues?.firstName}
            errorMessage={formState?.errors && formState.errors.firstNameError}
          />
          <CustomInput
            id={"lastname"}
            label={"LAST NAME"}
            type={"text"}
            name="last_name"
            placeholder="Abdelhalem"
            defaultValue={formState?.savedValues?.lastName}
            errorMessage={formState?.errors && formState.errors.lastNameError}
          />
        </div>
        <CustomInput
          id={"email"}
          label={"EMAIL ADDRESS"}
          type={"email"}
          name="email"
          placeholder="3ab7alim@gmail.com"
          defaultValue={formState?.savedValues?.email}
          errorMessage={formState?.errors && formState.errors.emailError}
        />
        <CustomInput
          id={"phone"}
          label={"YOUR PHONE"}
          type={"number"}
          name="phone"
          placeholder="01013625625"
          defaultValue={formState?.savedValues?.phone}
          errorMessage={formState?.errors && formState.errors.phoneError}
        />
        <CustomInput
          id={"password"}
          label={"PASSWORD"}
          type={"password"}
          name="password"
          defaultValue={formState?.savedValues?.password}
          errorMessage={formState?.errors && formState.errors.passwordError}
        />
      </div>

      <SubmitFormButton tempTitle='CREATING' tile='CREATE ACCOUNT' />
    </form>
  );
}
