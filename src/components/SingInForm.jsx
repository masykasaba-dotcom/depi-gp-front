import { useActionState, useState } from "react";
import CustomInput from "./CustomInput";
import SubmitFormButton from "./SubmitFormButton";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../store/AuthContext";
import { use } from "react";
import useSignIn from "../hooks/useSignIn";

export default function SingInForm() {
  const {errorMessage,formAction,formState} = useSignIn()
  
  return (
    <form action={formAction}>
      {errorMessage && (
        <div className="border border-red-300 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
          Invalid Password or Email
        </div>
      )}
      <div className="space-y-4">
        <CustomInput
          id={"email"}
          label={"EMAIL ADDRESS"}
          type={"text"}
          name="email"
          placeholder='mohamed3ab7alim@gmail.com'
          defaultValue={formState?.savedValues?.email}
          errorMessage={formState.errors && formState.errors.emailError}
        />
        <CustomInput
          id={"password"}
          label={"PASSWORD"}
          type={"password"}
          name="password"
          defaultValue={formState?.savedValues?.password}
          errorMessage={formState.errors && formState.errors.passwordError}
        />
      </div>
      <SubmitFormButton tempTitle="SINGING..." tile='SING IN'/>
    </form>
  );
}
