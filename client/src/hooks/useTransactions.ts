// hooks/useTransactions.ts
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Transaction, TransactionType } from "../types/transaction";
import type { QueryOptions } from "../services/transaction/getTransactions";
import api from "../api";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

interface State {
  loadedKey: string | null; // query key this data corresponds to
  error: string | null;
  transactions: Transaction[];
  pagination: Pagination;
}

const initialState: State = {
  loadedKey: null,
  error: null,
  transactions: [],
  pagination: {
    page: 1,
    limit: 50,
    total: 0,
    total_pages: 0,
  },
};

export default function useTransactions(token: string) {
  const [sp, setSp] = useSearchParams({
    tab: "ALL",
    limit: `${initialState.pagination.limit}`,
    page: `${initialState.pagination.page}`,
  });

  const current_tab = (sp.get("tab") as TransactionType | null) || "ALL";
  const page = Number(sp.get("page")) || initialState.pagination.page;
  const limit = Number(sp.get("limit")) || initialState.pagination.limit;

  const [state, setState] = useState<State>(initialState);

  const queryKey = `${token}|${current_tab}|${page}|${limit}`;

  const loading = state.loadedKey !== queryKey;

  const latestKeyRef = useRef<string | null>(null);

  useEffect(() => {
    latestKeyRef.current = queryKey;

    const queryOpt: QueryOptions = {
      type: current_tab,
      limit,
      page,
    };

    api
      .getTransactions(token, queryOpt)
      .then((res) => {
        if (latestKeyRef.current !== queryKey) return; // stale response
        setState({
          loadedKey: queryKey,
          error: null,
          transactions: res.transactions,
          pagination: res.pagination,
        });
      })
      .catch((err) => {
        if (latestKeyRef.current !== queryKey) return; // stale response
        setState((pre) => ({
          ...pre,
          loadedKey: queryKey,
          error: err?.message || "failed to get transactions",
        }));
      });
  }, [queryKey, token, current_tab, limit, page]);

  const goToPage = (nextPage: number) => {
    setSp((pre) => {
      pre.set("page", `${nextPage}`);
      return pre;
    });
  };

  const goToLimit = (nextLimit: number) => {
    setSp((pre) => {
      pre.set("limit", `${nextLimit}`);
      pre.set("page", "1");
      return pre;
    });
  };

  const goToTab = (tab: TransactionType) => {
    setSp((pre) => {
      pre.set("tab", tab);
      pre.set("page", "1");
      return pre;
    });
  };

  return {
    transactions: state.transactions,
    pagination: state.pagination,
    error: state.error,
    loading,
    current_tab,
    page,
    limit,
    goToPage,
    goToLimit,
    goToTab,
  };
}
