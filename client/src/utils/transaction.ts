import { format } from "date-fns";
import type { CreateTransactionFormData } from "../types/transaction";
export const DRAFT_KEY = "draft_transaction";

export function createNewTransaction(): CreateTransactionFormData {
  return {
    type: "INCOME",
    date: format(new Date(), "yyyy-MM-dd"),
    amount: 0,
    description: "",
    party_id: "",
  };
}

export function loadDraft(
  notEmpty: boolean = true,
): CreateTransactionFormData[] {
  // Support both the new and old key
  const draftString =
    localStorage.getItem(DRAFT_KEY) ?? localStorage.getItem("draf_transaction");

  if (!draftString) {
    if (notEmpty) {
      return [createNewTransaction()];
    }
    return [];
  }

  try {
    const draft = JSON.parse(draftString) as CreateTransactionFormData[];

    if (Array.isArray(draft) && draft.length > 0) {
      return draft;
    }
  } catch (error) {
    console.error("Failed to load draft transaction:", error);
  }

  if (notEmpty) {
    return [createNewTransaction()];
  }
  return [];
}
