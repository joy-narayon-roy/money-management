import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import type {
  CreatePartyFormData,
  Party,
  PartyFormDataValidationError,
} from "../types/party";
import api from "../api";

const INITIAL_FORM: CreatePartyFormData = {
  name: "",
  role: "INCOME",
  description: "",
};

type Return = {
  loading: boolean;
  error: string | null;
  form: CreatePartyFormData;
  party: Party | null;
  validationError: PartyFormDataValidationError | null;
  createParty: (info: CreatePartyFormData) => Promise<Party | null>;
  clearError: () => void;
  resetForm: () => void;
  handleChange: <K extends keyof CreatePartyFormData>(
    field: K,
    value: CreatePartyFormData[K],
  ) => void;
};

export default function useCreateParty(token: string | null): Return {
  const [form, setForm] = useState<CreatePartyFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [validationError, setValidationError] =
    useState<PartyFormDataValidationError | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setValidationError(null);
  }, []);
  const resetForm = useCallback(() => setForm(INITIAL_FORM), []);

  const handleChange = useCallback(
    <K extends keyof CreatePartyFormData>(
      field: K,
      value: CreatePartyFormData[K],
    ) => {
      setForm((previous) => ({ ...previous, [field]: value }));
    },
    [],
  );

  const createParty = useCallback(
    async (state: CreatePartyFormData): Promise<Party | null> => {
      if (!token) {
        setError("Please log in and try again.");
        return null;
      }

      const trimmedName = state.name.trim();
      if (!trimmedName) {
        setError("Party name is required.");
        return null;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      setValidationError(null);

      try {
        const {
          data: { party, validation_error, error: res_err },
        } = await api.party.createPartyRequest(state, token);
        setParty(party);
        if (res_err) {
          setError(res_err);
        }
        if (validation_error) {
          setValidationError(validation_error);
        }
        return party;
      } catch (err) {
        if (axios.isCancel(err)) return null;
        const message = axios.isAxiosError<{ message?: string }>(err)
          ? (err.response?.data?.message ??
            "Failed to create party. Please try again.")
          : "Something went wrong. Please try again.";

        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return {
    loading,
    error,
    form,
    party,
    validationError,
    createParty,
    clearError,
    resetForm,
    handleChange,
  };
}
