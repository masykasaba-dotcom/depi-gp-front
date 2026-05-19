import axios from "axios";
import { useState } from "react";
import { useActionState } from "react";
import { useNavigate } from "react-router";
import apiUrl from "../../shared/utils/apiUrl";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function useAdminLogin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  async function adminLoginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const errors = {
      emailError: null,
      passwordError: null,
    };

    if (!validateEmail(email)) {
      errors.emailError = "Please enter a valid email address.";
    }

    if (!password || password.trim().length < 6) {
      errors.passwordError = "Password must be at least 6 characters.";
    }

    if (errors.emailError || errors.passwordError) {
      return { errors, savedValues: { email, password } };
    }

    try {
      const { data } = await axios.post(`${apiUrl}admin/login`, {
        email,
        password,
      });

      // Store using the key expected by useAdminAPI.js
      localStorage.setItem("admin-token", data.token);
      navigate("/admin");
      return { errors: null };
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Invalid credentials. Please try again.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
      return { errors: null, savedValues: { email, password } };
    }
  }

  const [formState, formAction] = useActionState(adminLoginAction, {
    errors: null,
  });

  return { formState, formAction, errorMessage };
}
