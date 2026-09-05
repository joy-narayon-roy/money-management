import { format } from "date-fns";
import LZString from "lz-string";
import type {
  CreateTransactionFormData,
  TransactionType,
} from "../types/transaction";
export const DRAFT_KEY = "draft_transaction";

type CreateOption = {
  type?: TransactionType;
  date?: string;
};
export function createNewTransaction(
  td?: CreateOption,
): CreateTransactionFormData {
  return {
    type: td?.type || "INCOME",
    date: format(td?.date ? new Date(td.date) : new Date(), "yyyy-MM-dd"),
    amount: 0,
    description: "",
    party_id: "",
  };
}

type Option = {
  notEmpty?: boolean;
  formData?: CreateOption;
};
export function loadTransactionDraft(opt: Option): CreateTransactionFormData[] {
  const { notEmpty = true, formData } = opt;
  const draftString = localStorage.getItem(DRAFT_KEY);

  if (!draftString) {
    if (notEmpty) {
      return [createNewTransaction(formData)];
    }
    return [];
  }

  try {
    const json_str = LZString.decompressFromBase64(draftString);
    const draft = JSON.parse(json_str) as CreateTransactionFormData[];

    if (Array.isArray(draft) && draft.length > 0) {
      return draft;
    }
  } catch (error) {
    console.error("Failed to load draft transaction:", error);
  }

  if (notEmpty) {
    return [createNewTransaction(formData)];
  }
  return [];
}

export function saveTransactionDraft(form_datas: CreateTransactionFormData[]) {
  const json_str = JSON.stringify(form_datas);
  if (json_str === "[]") {
    return;
  }

  const compresed_str = LZString.compressToBase64(json_str);

  localStorage.setItem(DRAFT_KEY, compresed_str);
  // console.log(compresed_str);
}
