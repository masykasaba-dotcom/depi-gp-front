import axios from "axios";
import { useActionState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  isEmpty,
  validatEmail,
  validatPassword,
  validatPhone,
} from "../lib/validation";
import apiUrl from "../lib/apiUrl";

export default function useSignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  async function singUpAction(prevState, formData) {
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");

    let errors = {
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
      phoneError: null,
    };
    if (isEmpty(firstName)) {
      errors.firstNameError = "first name is required";
    }

    if (isEmpty(lastName)) {
      errors.lastNameError = "last name is required";
    }

    if (!validatEmail(email)) {
      errors.emailError = "invalid email";
    }

    if (validatPassword(password)) {
      errors.passwordError = "password must have 8 char atleast";
    }

    if (!validatPhone(phone)) {
      errors.phoneError = "put a egyptian number";
    }

    if (
      errors.firstNameError ||
      errors.lastNameError ||
      errors.emailError ||
      errors.passwordError ||
      errors.phoneError
    ) {
      return {
        errors,
        savedValues: {
          firstName,
          lastName,
          email,
          password,
          phone,
        },
      };
    }

    return await axios
      .post(
        `${apiUrl}auth/register`,
        {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          phone,
        },
      )
      .then((data) => {
        navigate("/sign-in");
        return {
          errors: null,
        };
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        return {
          errors: null,
          savedValues: {
            firstName,
            lastName,
            email,
            password,
            phone,
          },
        };
      });
  }

  const [formState, formAction] = useActionState(singUpAction, {
    errors: null,
  });

  return {
    formState,
    formAction,
    errorMessage,
  };
}
