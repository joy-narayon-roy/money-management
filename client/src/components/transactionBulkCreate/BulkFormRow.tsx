import type { ChangeEvent, DragEvent } from "react";
import { format } from "date-fns";
import {
    GripVertical,
    Trash2,
    Copy,
    ArrowDown,
} from "lucide-react";

import type { CreateTransactionFormData, TransactionError } from "../../types/transaction";
import type { Party } from "../../types/party";

import Input from "../Input";
import SelectInput from "../SelectInput";
import type { GroupOption } from "../SelectGroupInput";
import SelectGroupInput from "../SelectGroupInput";




const transactionTypeOptions: GroupOption[] = [
    {
        label: "General",
        value: [
            {
                value: "INCOME",
                label: "Income",
            },
            {
                value: "EXPENSE",
                label: "Expense",
            },
        ],
    },
    {
        label: "Receivable",
        value: [
            {
                value: "AR",
                label: "Accounts Receivable",
            },
            {
                value: "AR_PAYMENT",
                label: "Accounts Receivable Payment",
            },
        ],
    },
    {
        label: "Payable",
        value: [
            {
                value: "AP",
                label: "Accounts Payable",
            },
            {
                value: "AP_PAYMENT",
                label: "Accounts Payable Payment",
            },
        ],
    },
];



type Props = {
    index: number | string;
    transaction: CreateTransactionFormData;
    parties?: Party[];
    disabled?: boolean,
    error?: TransactionError | null,
    onChange?: (
        index: number,
        key: keyof CreateTransactionFormData,
        value: string | number
    ) => void;

    swapPosition?: (
        currentIndex: number,
        newIndex: number
    ) => void;

    onDelete?: (index: number) => void;

    onCopyDown?: (index: number) => void;

    isDragging?: boolean;

    isDragOver?: boolean;

    onDragStart?: (index: number) => void;

    onDragOver?: (index: number) => void;

    onDragEnd?: () => void;
};

export default function BulkFormRow(props: Props) {
    const {
        transaction: { type, date = format(new Date(), "yyyy-MM-dd"), description = "", amount, party_id, },
        parties = [],
        index = 0,
        onChange = () => { },
        swapPosition = () => { },
        onDelete = () => { },
        onCopyDown = () => { },
        isDragging = false,
        isDragOver = false,
        onDragStart = () => { },
        onDragOver = () => { },
        onDragEnd = () => { },
        error: val_err
    } = props

    const currentIndex = Number(index);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name as keyof CreateTransactionFormData;
        const value = event.target.value;
        onChange(currentIndex, name, value);
    };
    const filteredParties = [
        {
            label: "Select",
            value: "",
        },
        ...parties
            .filter((party) => party.role === type)
            .map((party) => ({
                label: party.name,
                value: party.id,
            })),
    ];

    const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(currentIndex));
        onDragStart(currentIndex);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOver(currentIndex);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedIndex = Number(event.dataTransfer.getData("text/plain"));
        if (Number.isNaN(draggedIndex)) {
            return;
        }

        if (draggedIndex === currentIndex) {
            return;
        }

        swapPosition(draggedIndex, currentIndex);
    };

    return (
        <div
            className={`grid grid-cols-[32px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_32px_32px] items-center gap-1 rounded-lg transition-all duration-150 ${isDragging ? "bg-gray-50 shadow-sm ring-1 ring-gray-200" : ""} ${isDragOver && !isDragging ? "bg-gray-50 ring-1 ring-gray-200" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={onDragEnd}
                    className="flex h-8 w-8 cursor-grab items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing"
                    title="Drag to reorder"
                    aria-label="Drag to reorder"
                >
                    <GripVertical size={17} />
                </button>
            </div>

            <div>
                <Input
                    required
                    name="date"
                    type="date"
                    value={date}
                    onChange={handleChange}
                    error={val_err?.date}
                />
            </div>
            <div>
                <SelectGroupInput
                    required
                    name="type"
                    options={transactionTypeOptions}
                    onChange={handleChange}
                    value={type}
                    error={val_err?.type}


                />
            </div>
            <div>
                <Input
                    required
                    type="text"
                    name="description"
                    maxLength={20}
                    value={description}
                    onChange={handleChange}
                    error={val_err?.description}
                />
            </div>

            <div>
                <Input
                    required
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                error={val_err?.amount}
                />
            </div>

            <div>
                <SelectInput
                    name="party_id"
                    value={party_id || ""}
                    onChange={handleChange}
                    options={filteredParties}
                    error={val_err?.party_id}
                />
            </div>

            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => onDelete(currentIndex)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600
          "
                    title="Delete"
                    aria-label="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => onCopyDown(currentIndex)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    title="Copy down"
                    aria-label="Copy down"
                >
                    <Copy size={16} />
                </button>
            </div>
        </div>
    );
}

export function BulkFormRowHeader({ onDateSortClick = () => { } }: { onDateSortClick: () => void }) {
    return (
        <div
            className={`py-2 grid grid-cols-[32px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_32px_32px] items-center gap-1 rounded-lg transition-all duration-150 text-center text-text-secondary text-sm`}
        >
            <span></span>
            <span>Date <button onClick={onDateSortClick} className="p-1 hover:bg-gray-100 rounded"><ArrowDown size={10} /></button></span>
            <span>Type</span>
            <span>Description</span>
            <span>Amount</span>
            <span>Party</span>
        </div>

    )
}