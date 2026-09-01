import { useState } from "react";


import { TransactionSummary, TransactionForm } from "../../components/transactionsCreate";

import type {
  CreateTransactionFormData,
  CreateTransactionResponse,
  TransactionError,
} from "../../types/transaction";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import services from "../../services";
import { addTransaction } from "../../store/reducers/transactionReducer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import { createNewTransaction, DRAFT_KEY, loadDraft } from "../../utils/transaction";
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function CreateTransaction() {
  const [sp] = useSearchParams({
    draft: "0"
  })
  const isDraft = sp.get("draft") === "1"
  const userState = useSelector((s: RootState) => s.user)
  const token = useSelector((s: RootState) => s.auth.token)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const draftTransactions = loadDraft(false)
  const [form, setForm] = useState<CreateTransactionFormData>(isDraft ? loadDraft()[0] : createNewTransaction());
  const [validationError, setValidationError] = useState<TransactionError>({})

  const parties = (userState.user?.parties || [])
    .filter(p => p.role === form.type)
    .map(p => ({ value: p.id, lable: p.name }))


  const handleChange = <K extends keyof CreateTransactionFormData>(field: K, value: CreateTransactionFormData[K]) => {
    if (field === "type" && form.party_id === "") {
      // Use the *new* type (value), not the old form.type
      const party = (userState.user?.parties || []).filter(
        (p) => p.role === value
      )[0];

      setForm((pre) => ({
        ...pre,
        [field]: value,
        party_id: party?.id ?? "",
      }));
    } else {
      setForm((previous) => ({
        ...previous,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CreateTransactionFormData = {
      type: form.type,
      amount: Number(form.amount),
      date: form.date,
      description:
        form.description || "",

      party_id:
        form.party_id || "",
    };



    if (token) {

      services.transaction.createTransaction(token, payload)
        .then(transaction => {
          dispatch(addTransaction({ transaction }))
          nav("/transactions")
        })
        .catch(err => {
          if (axios.isAxiosError<CreateTransactionResponse>(err)) {
            if (err.response?.status === 400) {
              const data = err.response.data
              setValidationError((pre) => data.validation_error || pre)
            } else {
              console.log(err.message)
            }
          } else {
            console.log(err)
          }
        })

    }
  };

  const deleteDraft = () => {
    localStorage.removeItem(DRAFT_KEY)
    nav("")
  }

  const isPayment =
    form.type === "AR_PAYMENT" ||
    form.type === "AP_PAYMENT";

  return (
    <div className="px-4 py-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
            <span>Transactions</span>

            <span>/</span>

            <span className="text-gray-700">
              New Transaction
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Create Transaction
          </h1>

          <p className="text-sm text-gray-500">
            Record a new financial transaction. <br />

          </p>
          <div className="flex flex-row items-center">
            {draftTransactions.length > 0 ?
              <>
                <Link to={`?draft=1`} className="text-sm text-red-500">
                  {`${draftTransactions.length} draft transaction${draftTransactions.length > 1 ? "s" : ""
                    }`}
                </Link>
                <button
                  type="button"
                  onClick={() => deleteDraft()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600
              "
                  title="Delete"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </>
              : ""}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-6">
                  <h2 className="text-base font-semibold text-gray-900">
                    Transaction Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the details of your
                    transaction below.
                  </p>
                </div>

                <div className="p-6">
                  <TransactionForm
                    validation_error={validationError}
                    form={form}
                    parties={parties || []}
                    onChange={handleChange}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      window.history.back()
                    }
                    className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <Button type="submit">
                    {isPayment
                      ? "Record Payment"
                      : "Create Transaction"}

                  </Button>
                </div>

                {/* Others */}
                <div className="flex items-center justify-center border-t border-gray-200 bg-gray-50/50 px-6 py-4 text-primary">
                  <Link to={"bulk"}>Create Bulk</Link>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <TransactionSummary
                form={form}
                parties={parties}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}