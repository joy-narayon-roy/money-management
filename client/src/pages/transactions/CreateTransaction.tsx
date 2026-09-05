import { useState } from "react";


import { TransactionSummary, TransactionForm } from "../../components/transactionsCreate";

import type {
  CreateTransactionFormData,
  CreateTransactionResponse,
  TransactionError,
} from "../../types/transaction";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { addTransaction } from "../../store/reducers/transactionReducer";
import { Link, useNavigate, } from "react-router-dom";
import { createNewTransaction, } from "../../utils/transaction";
import axios from "axios";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonCancel from "../../components/ButtonCancel";
import type { Option } from "../../types/select_option";
import PageHeading from "../../components/global/PageHeadeing";
import api from "../../api";

export default function CreateTransaction() {
  // const [sp] = useSearchParams({
  //   draft: "0"
  // })
  // const isDraft = sp.get("draft") === "1"
  const userState = useSelector((s: RootState) => s.user)
  const token = useSelector((s: RootState) => s.auth.token)
  const dispatch = useDispatch()
  const nav = useNavigate()
  // const draftTransactions = loadDraft(false)
  const [form, setForm] = useState<CreateTransactionFormData>(createNewTransaction());
  const [validationError, setValidationError] = useState<TransactionError>({})

  const roleForFormType: Record<string, string> = {
    AP_PAYMENT: "AP",
    AR_PAYMENT: "AR",
  }

  const parties = (userState.user?.parties || [])
  const party_options: Option[] = parties
    .filter(p => p.role === (roleForFormType[form.type] ?? form.type))
    .map((p): Option => ({ value: p.id, label: p.name }))

  const handleChange = <K extends keyof CreateTransactionFormData>(field: K, value: CreateTransactionFormData[K]) => {
    setForm((previous) => {

      if (field === "party_id" && previous.description === "") {
        previous.description = parties.filter(p => p.id === value)[0].description || ""
      }
      if (field === "amount") {
        return {
          ...previous,
          amount: Number(String(value).replace(/^0+(?=\d)/, "")),
        };
      }
      return {
        ...previous,
        [field]: value,
      }
    });
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

      api.createTransaction(token, payload)
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


  const isPayment =
    form.type === "AR_PAYMENT" ||
    form.type === "AP_PAYMENT";

  return (
    <div className="px-4 py-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <PageHeading
          breadcrumbs={[{ label: "Transactions", to: "/transactions" }, { label: "New Transaction" }]}
          title="Create Transaction"
        />

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
                    parties={party_options || []}
                    onChange={handleChange}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/50 px-6 py-4">

                  <ButtonCancel
                    onClick={() => window.history.back()}
                  />
                  <ButtonPrimary
                    type="submit">
                    {isPayment
                      ? "Record Payment"
                      : "Create Transaction"}

                  </ButtonPrimary>
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
                parties={party_options}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}