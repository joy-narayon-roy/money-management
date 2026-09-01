import LZString from 'lz-string';
import { useSelector } from "react-redux";
import type { CreateTransactionFormData, TransactionError } from "../../types/transaction";
import type { RootState } from "../../store";
import BulkFormRow, { BulkFormRowHeader } from "./BulkFormRow";
import { BroomSparkles, Eye, Plus } from "lucide-react";
import { useEffect } from "react";
import { Create_Transaction_LIST, } from "../../types/preview";

type Props = {
    transactions?: CreateTransactionFormData[];
    errors?: TransactionError[],
    draggedIndex?: number | null;
    dragOverIndex?: number | null;
    disabled?: boolean;
    onChange?: (index: number, key: keyof CreateTransactionFormData, value: string | number) => void;
    swapPosition?: (currentIndex: number, newIndex: number) => void;
    onDelete?: (index: number) => void;
    onCopyDown?: (index: number) => void;
    onDragStart?: (index: number) => void;
    onDragOver?: (index: number) => void;
    onDragEnd?: () => void;
    addRow?: () => void
    clearData?: () => void
    onDateSortClick?: () => void
};

export default function TransactionBulkForm({
    transactions = [],
    onChange = () => { },
    swapPosition = () => { },
    onDelete = () => { },
    onCopyDown = () => { },
    draggedIndex = null,
    dragOverIndex = null,
    onDragStart = () => { },
    onDragOver = () => { },
    onDragEnd = () => { },
    addRow = () => { },
    clearData = () => { },
    disabled = false,
    onDateSortClick = () => { },
    errors = []
}: Props) {
    const { user } = useSelector((state: RootState) => state.user);
    const parties = user?.parties || [];
    useEffect(() => {
        const listener = (ev: KeyboardEvent) => {

            if (ev.ctrlKey && ev.key === "ArrowDown") {
                addRow()
            }
        };

        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, [addRow]);

    const openPreview = () => {
        const transactions_str = JSON.stringify(transactions)
        const sp = new URLSearchParams({
            type: Create_Transaction_LIST,
            data: LZString.compressToBase64(transactions_str)
        })

        const url = `/preview?${sp.toString()}`
        window.open(url, "_blank", "noopener,noreferrer");
    }

    return (
        <div className="flex flex-col gap-1">
            <BulkFormRowHeader onDateSortClick={onDateSortClick} />
            {transactions.map((transaction, index) => (
                <BulkFormRow
                    key={index}
                    index={index}
                    transaction={transaction}
                    parties={parties}
                    onChange={onChange}
                    swapPosition={swapPosition}
                    onDelete={onDelete}
                    onCopyDown={onCopyDown}
                    isDragging={draggedIndex === index}
                    isDragOver={dragOverIndex === index}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragEnd={onDragEnd}
                    disabled={disabled}
                    error={errors[index]}
                />
            ))}

            <div className="mt-4 px-5 flex flex-row justify-end">
                <button
                    disabled={disabled}
                    type="button"
                    onClick={clearData}
                    className="px-4 py-1 border rounded border-border text-text-primary"
                >
                    <BroomSparkles size={20} />
                </button>
                <button
                    type="button"
                    onClick={openPreview}
                    className="px-4 py-1 border rounded border-border text-text-primary"
                >
                    <Eye size={20} />
                </button>
                <button
                    disabled={disabled}
                    type="button"
                    onClick={addRow}
                    className="px-4 py-1 border rounded border-border text-text-primary"
                >
                    <Plus size={20} />
                </button>
            </div>
        </div>
    );
}
