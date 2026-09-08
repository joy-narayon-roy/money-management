import { useEffect, useState } from "react";
import type { Party } from "../types/party";
import type { Transaction } from "../types/transaction";
import type { PaginationType } from "../types/pagination";
import api from "../api";
import { useParams, useSearchParams } from "react-router-dom";

interface BaseState {
  loading: boolean;
  error: string | null;
}
interface PartyState extends BaseState {
  party: Party | null;
}
interface TransactionState extends BaseState {
  transactions: Transaction[];
  pagination: PaginationType;
}
type ReturnType = {
  party: PartyState;
  transaction: TransactionState;
  sort: string;
  updateSort: (k: string, s: string) => void;
  goToPage: (page: number) => void;
};

export default function usePartyInfo(token: string | null): ReturnType {
  const { id } = useParams<{ id: string }>();
  const [sp, setSp] = useSearchParams();
  const sort = sp.get("sort") || "";

  const [partyState, setPartyState] = useState<PartyState>({
    loading: true,
    error: null,
    party: null,
  });

  const [transationsState, setTransationsState] = useState<TransactionState>({
    loading: true,
    error: null,
    transactions: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      total_pages: 0,
    },
  });

  // Party info fetch
  useEffect(() => {
    if (!id || !token) {
      return;
    }
    api.party
      .getPartyById(token, id)
      .then(({ data }) => {
        setPartyState({
          loading: false,
          error: null,
          party: data,
        });
      })
      .catch(() => {
        setPartyState((p) => ({
          ...p,
          error: "Failed to get party info!",
          loading: false,
        }));
      })
      .finally(() => {
        setPartyState((p) => ({ ...p, loading: false }));
      });
  }, [token, id]);

  // Party transactions fetch
  useEffect(() => {
    api
      .getTransactions(token, {
        limit: transationsState.pagination.limit || 20,
        page: transationsState.pagination.page || 1,
        party: [id ? id : ""],
        sort: sort,
      })
      .then((tr) => {
        setTransationsState((pre) => ({
          ...pre,
          error: null,
          loading: false,
          pagination: {
            ...pre.pagination,
            ...tr.pagination,
          },
          transactions: tr.transactions,
        }));
      })
      .catch(() => {
        setTransationsState((p) => ({
          ...p,
          error: "Failed to get party transactions!",
          loading: false,
        }));
      })
      .finally(() => {
        setTransationsState((p) => ({ ...p, loading: false }));
      });
  }, [
    token,
    id,
    transationsState.pagination.limit,
    transationsState.pagination.page,
    sort,
  ]);

  const goToPage = (page: number) => {
    setTransationsState((p) => {
      return {
        ...p,
        pagination: {
          ...p.pagination,
          page: page,
        },
      };
    });
  };
  const updateSort = (k: string, s: string) => {
    setSp((p) => {
      p.set("sort", `${s}${k}`);
      return p;
    });
  };

  return {
    party: partyState,
    transaction: transationsState,
    sort,
    goToPage,
    updateSort,
  };
}
