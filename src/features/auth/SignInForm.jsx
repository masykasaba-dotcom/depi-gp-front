import { useActionState, useState } from "react";
import CustomInput from "../../components/ui/CustomInput";
import SubmitFormButton from "../../components/ui/SubmitFormButton";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";
import useSignIn from "../../hooks/useSignIn";

export default function SingInForm() {
  const { errorMessage, formAction, formState } = useSignIn();

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {errorMessage && (
        <div className="border border-[#ffdad6] bg-[#ffdad6]/30 text-[#93000a] px-4 py-3 rounded text-sm mb-2">
          Invalid Password or Email
        </div>
      )}
      <div className="flex flex-col gap-2">
        <CustomInput
          id={"email"}
          label={"EMAIL ADDRESS"}
          type={"email"}
          name="email"
          placeholder="ahmedali34@gmail.com"
          defaultValue={formState?.savedValues?.email}
          errorMessage={formState.errors && formState.errors.emailError}
        />
        <CustomInput
          id={"password"}
          label={"PASSWORD"}
          type={"password"}
          name="password"
          placeholder="••••••••••••"
          defaultValue={formState?.savedValues?.password}
          errorMessage={formState.errors && formState.errors.passwordError}
        />
      </div>
      <div className="pt-2">
        <SubmitFormButton tempTitle="SIGNING IN..." tile="SIGN IN" />
      </div>
    </form>
  );
}
