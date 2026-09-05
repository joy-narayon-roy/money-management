import type { CreatePartyFormData, Party, PartyFormDataValidationError } from "../../types/party"
import Input from "../Input";
import InputField from "../InputField";
import SelectInput, { type SelectOption } from "../SelectInput";

const roleOptions: SelectOption[] = [
    {
        label: "Select Role",
        value: ""
    },
    {
        label: "Income",
        value: "INCOME"
    },
    {
        label: "Expense",
        value: "EXPENSE"
    },
    {
        label: "Account Payable",
        value: "AP"
    },
    {
        label: "Account Recivable",
        value: "AR"
    }
]

type Props = {
    form: CreatePartyFormData
    validation_error?: PartyFormDataValidationError | null
    parties?: Party[]
    onChange: (
        field: keyof CreatePartyFormData,
        value: string
    ) => void;
}
export default function PartyForm({ form, onChange, validation_error: verr }: Props) {
    const { description, name, role } = form
    return (
        <div className="space-y-6">
            <InputField label="Name" error_message={verr?.name} >
                <Input
                    name="name"
                    onChange={(e) => onChange("name", e.target.value)}
                    required
                    placeholder="Enter the party name"
                    value={name}
                    error={verr?.name}
                />
            </InputField>

            <InputField label="Role" error_message={verr?.role} >
                <SelectInput
                    name="role"
                    value={role}
                    required
                    onChange={(e) => onChange("role", e.target.value)}
                    options={roleOptions}
                    error={verr?.role}

                />
            </InputField>

            <InputField
                label="Description" error_message={verr?.description}>
                <Input
                    name="description"
                    onChange={(e) => onChange("description", e.target.value)}
                    placeholder="Enter the party description"
                    value={description}
                    error={verr?.description}
                />

            </InputField>
        </div>
    );
}
