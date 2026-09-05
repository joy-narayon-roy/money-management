import { useEffect, useState } from "react";
import type { Party } from "../types/party";
import type { PaginationType } from "../types/pagination";
import api from "../api";

interface UsePartiesParams {
  search: string;
  role: string;
  status: string;
  page: number;
  limit: number;
}

interface PartiesResult {
  parties: Party[];
  pagination: PaginationType;
  loading: boolean;
  error: string | null | undefined;
}

export function useParties(
  token: string,
  { search, role, status, page, limit }: UsePartiesParams,
): PartiesResult {
  const [parties, setParties] = useState<Party[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParties() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (role !== "ALL") {
          params.set("role", role);
        }

        if (status !== "ALL") {
          params.set("is_active", status);
        }

        const { data: result } = await api.party.getParties(
          token,
          params.toString(),
        );

        setLoading(false);
        setError(null);
        setParties(result.parties||[]);
        setPagination((pre) => result.pagination || pre);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }

    fetchParties();

    return () => {};
  }, [search, role, status, page, limit, token]);

  return {
    parties,
    pagination,
    loading,
    error,
  };
}
