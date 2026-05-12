import axios from "axios";
import React, { useState } from "react";
import { useActionState } from "react";
import { use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../store/AuthContext";
import { validatEmail, validatPassword } from "../lib/validation";
import Cookies from "js-cookie";
import apiUrl from "../lib/apiUrl";
export default function useSignIn() {
  const { setToken } = use(AuthContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  
  async function singInAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const errors = {
      emailError: null,
      passwordError: null,
    };

    if (!validatEmail(email)) {
      errors.emailError = "invalid email";
    }

    if (validatPassword(password)) {
      errors.passwordError = "invalid password";
    }

    if (errors.emailError || errors.passwordError) {
      return {
        errors,
        savedValues: {
          email,
          password,
        },
      };
    }

    return await axios
      .post(
        `${apiUrl}auth/login`,
        {
          email,
          password,
        },
      )
      .then((data) => {
        localStorage.setItem("tkn", data.data.token);
        Cookies.set('tkn',data.data.token,{expires : 7})
        navigate("/");
        setToken(data.data.token);
        return { errors: null };
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err.response.data);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
        return {
          error: null,
          savedValues: {
            email,
            password,
          },
        };
      });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(singInAction, {
    errors: null,
  });

  return {
    formState,
    formAction,
    errorMessage,
  };
}
