import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PartyHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Parties
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your customers, suppliers and other parties.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/parties/new")}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <Plus className="h-4 w-4" />
        Add Party
      </button>
    </div>
  );
}