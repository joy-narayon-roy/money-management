import type { ChangeEvent, DragEvent } from "react";
import { format } from "date-fns";
import {
    GripVertical,
    Trash2,
    Copy,
    ArrowDown,
    ClipboardCheck,
} from "lucide-react";

import type { CreateTransactionFormData, TransactionError, TransactionType } from "../../types/transaction";
import type { Party } from "../../types/party";

import Input from "../Input";
import SelectInput from "../SelectInput";
import SelectGroupInput from "../SelectGroupInput";
import data from "../../data";
import type React from "react";




type Props = {
    index: number | string;
    transaction: CreateTransactionFormData;
    parties?: Party[];
    disabled?: boolean,
    error?: TransactionError | null,
    isDragging?: boolean;
    isDragOver?: boolean;
    fixed_type?: TransactionType
    fixed_date?: string
    onChange?: (index: number, key: keyof CreateTransactionFormData, value: string | number) => void;
    swapPosition?: (currentIndex: number, newIndex: number) => void;
    onDelete?: (index: number) => void;
    onCopyDown?: (index: number) => void;
    onDragStart?: (index: number) => void;
    onDragOver?: (index: number) => void;
    onDragEnd?: () => void;
    openTemplateModal?: (i: number) => void
};

export default function BulkFormRow(props: Props) {
    const {
        parties = [],
        index = 0,
        onChange = () => { },
        swapPosition = () => { },
        onDelete = () => { },
        onCopyDown = () => { },
        // isDragging = false,
        // isDragOver = false,
        onDragStart = () => { },
        onDragOver = () => { },
        onDragEnd = () => { },
        error: val_err,
        fixed_type,
        fixed_date,
        transaction: { type, date = format(new Date(), "yyyy-MM-dd"), description = "", amount, party_id, },
        openTemplateModal = () => { }
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

    const grid_cols_length = () => {
        let c = 5
        if (fixed_type) {
            c = c - 1
        }
        if (fixed_date) {
            c = c - 1

        }
        return c
    }

    const style: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `32px repeat(${grid_cols_length()}, 1fr) 64px`
    }
    return (
        <div
            style={style}
            className="gap-1"
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

            {/* Date */}
            {!fixed_date &&
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
            }

            {/* Type */}
            {(!fixed_type) &&
                <div>
                    <SelectGroupInput
                        required
                        name="type"
                        options={data.options.transaction.group_type_options}
                        onChange={handleChange}
                        value={type}
                        error={val_err?.type}


                    />
                </div>
            }

            {/* Description */}
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

            {/* Amount */}
            <div>
                <Input
                    required
                    type="number"
                    name="amount"
                    value={`${amount}`}
                    onChange={handleChange}
                    error={val_err?.amount}
                />
            </div>

            {/* Party */}
            <div>
                <SelectInput
                    name="party_id"
                    value={party_id || ""}
                    onChange={handleChange}
                    options={filteredParties}
                    error={val_err?.party_id}
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-around">
                <button
                    type="button"
                    onClick={() => openTemplateModal(currentIndex)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    title="Copy down"
                    aria-label="Copy down"
                >
                    <ClipboardCheck size={16} />
                </button>

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

export function BulkFormRowHeader({ fixed_type, fixed_date, onDateSortClick = () => { } }: { fixed_type?: TransactionType, fixed_date?: string, onDateSortClick: () => void }) {

    const grid_cols_length = () => {
        let c = 5
        if (fixed_type) {
            c = c - 1
        }
        if (fixed_date) {
            c -= 1
        }
        return c
    }

    const style: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `32px repeat(${grid_cols_length()}, 1fr) 64px`
    }

    return (
        <div
            className={`py-2 items-center gap-1 rounded-lg transition-all duration-150 text-center text-text-secondary text-sm`}
            style={style}
        >
            <span></span>
            {(!fixed_date) && <span>
                Date <button type="button" onClick={onDateSortClick} className="p-1 hover:bg-gray-100 rounded"><ArrowDown size={10} /></button>
            </span>}
            {(!fixed_type) && <span>Type</span>}
            <span>Description</span>
            <span>Amount</span>
            <span>Party</span>
            <span></span>
        </div>

    )
}