import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction";
import api from "../api";

type State = {
  loading: boolean;
  error: string | null;
  transaction: Transaction | null;
};
const useTransactionDetails = (token: string, id: string): State => {
  const [state, setState] = useState<State>({
    transaction: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    api.transaction.getTransactionByID(token, id).then((d) => {
      setState({
        loading: false,
        error: null,
        transaction: d,
      });
    });
    return () => {};
  }, [token, id]);

  return state;
};
export default useTransactionDetails;
