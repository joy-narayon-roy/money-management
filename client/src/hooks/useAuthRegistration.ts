import { useState } from "react";
import type {
  RegistrationForm,
  RegistrationFormValidationError,
} from "../types/auth";
import axios from "axios";
import api from "../api";

interface ReturnType {
  loading: boolean;
  error?: string | null;
  form: RegistrationForm;
  validationError: RegistrationFormValidationError;
  submitFormData: () => Promise<string | null>;
  updateFormData: (key: keyof RegistrationForm, value: string) => void;
  clearError: () => void;
}

function useAuthRegistration(): ReturnType {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] =
    useState<RegistrationFormValidationError>({});
  const [form, setState] = useState<RegistrationForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormData = (key: keyof RegistrationForm, value: string) => {
    setValidationError({});
    setState((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  const clearError = () => {
    setError(null);
  };

  const submitFormData = async (): Promise<string | null> => {
    if (form.password !== form.confirmPassword) {
      setValidationError({
        ...validationError,
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      });
      return null;
    }

    setLoading(true);
    setError(null);
    setValidationError({});

    try {
      const { data } = await api.auth.register(form);
      return data?.token || null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message == "email already exists") {
          setValidationError({
            ...validationError,
            email: "email already exists",
          });
        }
      } else {
        setError("failed to register");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    form,
    validationError,
    submitFormData,
    updateFormData,
    clearError,
  };
}

export default useAuthRegistration;
