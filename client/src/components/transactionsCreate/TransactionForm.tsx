
import type {
  CreateTransactionFormData,
  TransactionError,
} from "../../types/transaction";

import TransactionField from "./TransactionField";
import SelectGroupInput from "../SelectGroupInput";
import SelectInput from "../SelectInput";
import type { Option } from "../../types/select_option";
import Input from "../Input";
import data from "../../data";

const amount_suggetion = Array.from({ length: 100 }, (_, i) => i * 100);

interface TransactionFormProps {
  form: CreateTransactionFormData;
  parties: Option[]
  validation_error: TransactionError
  onChange: (
    field: keyof CreateTransactionFormData,
    value: string
  ) => void;
}


export default function TransactionForm({
  form,
  parties = [],
  validation_error: verr,
  onChange,
}: TransactionFormProps) {
  const {
    type,
    amount,
    date,
    description,
    party_id
  } = form;


  const isPayment =
    type === "AR_PAYMENT" ||
    type === "AP_PAYMENT";

  return (
    <div className="space-y-6">
      {/* Transaction Type */}
      <TransactionField label="Transaction Type" error_message={verr.type}>
        <SelectGroupInput
          onChange={(e) => onChange("type", e.target.value)}
          required
          options={data.options.transaction.group_type_options}
        />
      </TransactionField>

      {/* Party */}
      <TransactionField label="Party" error_message={verr.party_id}>
        <SelectInput
          onChange={(e) => onChange("party_id", e.target.value)}
          required
          options={parties}
          value={party_id}
        />
      </TransactionField>


      {/* Outstanding Balance */}
      {isPayment && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Outstanding Balance
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            ৳ 25,000.00
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Current outstanding amount for the
            selected party.
          </p>
        </div>
      )}

      {/* Amount */}
      <TransactionField
        label={isPayment ? "Payment Amount" : "Amount"}
        error_message={verr.amount}
      >
        <Input
          type="number"
          id={"amount_suggetion"}
          onChange={(e) =>
            onChange(
              "amount",
              e.target.value
            )
          }
          required
          value={`${amount}`}

        />
        <datalist id="amount_suggetion">
          {amount_suggetion.map((amo) => <option key={amo} value={amo} >{amo}</option>)}
        </datalist>

      </TransactionField>


      {/* Date */}
      <TransactionField label="Date" error_message={verr.date}>
        <Input
          type="date"
          value={date}
          onChange={(e) =>
            onChange(
              "date",
              e.target.value
            )
          }
          required

        />
      </TransactionField>

      {/* Description */}
      <TransactionField
        label="Description"
        error_message={verr.description}
      >

        <Input
          onChange={(e) => onChange("description", e.target.value)}
          required
          autoComplete="on"
          placeholder="Add a note about this transaction..."
          value={description}
        />

      </TransactionField>
    </div>
  );
}