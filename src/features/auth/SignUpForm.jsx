import CustomInput from "../../components/ui/CustomInput";
import { useActionState, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import SubmitFormButton from "../../components/ui/SubmitFormButton";
import useSignUp from "../../hooks/useSignUp";

export default function SingUpForm() {
  const { formAction, formState, errorMessage } = useSignUp();

  return (
    <form action={formAction} className="flex flex-col gap-4 md:gap-6">
      {errorMessage && (
        <div className="border border-[#ffdad6] bg-[#ffdad6]/30 text-[#93000a] px-4 py-3 rounded text-sm mb-2">
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4 md:gap-8">
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
          placeholder="ahmedali34@gmail.com"
          defaultValue={formState?.savedValues?.email}
          errorMessage={formState?.errors && formState.errors.emailError}
        />
        <CustomInput
          id={"phone"}
          label={"YOUR PHONE"}
          type={"tel"}
          name="phone"
          placeholder="01013625625"
          defaultValue={formState?.savedValues?.phone}
          errorMessage={formState?.errors && formState.errors.phoneError}
        />
        <div className="relative">
          <CustomInput
            id={"password"}
            label={"PASSWORD"}
            type={"password"}
            name="password"
            placeholder="••••••••••••"
            defaultValue={formState?.savedValues?.password}
            errorMessage={formState?.errors && formState.errors.passwordError}
          />
        </div>
      </div>

      <div className="pt-2 md:pt-4">
        <SubmitFormButton tempTitle="CREATING..." tile="CREATE ACCOUNT" />
      </div>
    </form>
  );
}
