import { useEffect, useState, type FormEvent } from "react";

import Button from "../../components/Button";
import { TransactionBulkForm } from "../../components/transactionBulkCreate";

import type { BulkTransactionResponse, CreateTransactionFormData, TransactionError } from "../../types/transaction";
import { Transaction } from "../../models";
import { createNewTransaction, DRAFT_KEY, loadDraft } from "../../utils/transaction";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import services from "../../services";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import axios from "axios";



export default function CreateBulkTransaction() {
    const { token } = useSelector((s: RootState) => s.auth)
    const [state, setState] = useState<CreateTransactionFormData[]>(loadDraft);
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState<TransactionError[]>([])

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    // Save draft whenever state changes
    useEffect(() => {
        const draftTransactions = state.filter((transaction) =>
            Transaction.validate(transaction)
        );

        if (draftTransactions.length > 0) {
            localStorage.setItem(
                DRAFT_KEY,
                JSON.stringify(draftTransactions)
            );
        }

    }, [state]);

    const draftTransactions = loadDraft(false)

    const swapPosition = (currentIndex: number, newIndex: number) => {
        setState((prev) => {
            if (
                currentIndex < 0 ||
                newIndex < 0 ||
                currentIndex >= prev.length ||
                newIndex >= prev.length
            ) {
                return prev;
            }

            const newState = [...prev];

            [newState[currentIndex], newState[newIndex]] = [
                newState[newIndex],
                newState[currentIndex],
            ];

            return newState;
        });
    };

    const onDateSortClick = () => {
        setState((prev) => {
            return [...prev].sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
        });
    };

    const handleInput = (index: number, key: keyof CreateTransactionFormData, value: string | number) => {
        setState((prev) =>
            prev.map((transaction, i) => {

                if (key === "amount") {
                    return i === index
                        ? {
                            ...transaction,
                            [key]: Number(value),
                        }
                        : transaction
                }

                return i === index
                    ? {
                        ...transaction,
                        [key]: value,
                    }
                    : transaction
            })
        );
    };

    const addRow = () => {
        setState((prev) => [...prev, createNewTransaction()]);
    };

    const deleteRow = (index: number) => {
        setState((prev) => {
            if (prev.length <= 1) {
                return prev;
            }

            return prev.filter((_, i) => i !== index);
        });
    };

    const copyDown = (index: number) => {
        setState((prev) => {
            const row = prev[index];

            if (!row) {
                return prev;
            }

            const newState = [...prev];

            newState.splice(index + 1, 0, {
                ...row,
            });

            return newState;
        });
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragOver = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) {
            return;
        }

        setDragOverIndex(index);
    };

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onDateSortClick()
        setLoading(true)
        setValidationError([])
        services.transaction.createBulkTransaction(token, state)
            .then(data => {
                Object.entries(data.validation_errors).forEach(([i, tr_err]) => {
                    if (!tr_err) {
                        setState(pr => [...pr.filter((_, ind) => ind !== Number(i))])
                    } else {
                        setValidationError(pre => {
                            pre.push(tr_err)
                            return [...pre]
                        })
                    }
                })
                setLoading(false)
                deleteDraft()

            }).catch(err => {
                if (axios.isAxiosError<BulkTransactionResponse>(err)) {
                    if (err.response?.status === 400) {
                        const data = err.response.data
                        if (data.validation_errors) {
                            Object.entries(data.validation_errors).map((...x) => {
                                console.log(x)
                            })
                        }
                    } else {
                        console.log(err.message)
                    }
                } else {
                    console.log(err)
                }
            })
    };

    const deleteDraft = () => {
        localStorage.removeItem(DRAFT_KEY)
        // setState([createNewTransaction()])
    }
    const clearData = () => {
        const ok = confirm("Want to clean Transactions?")
        if (!ok) {
            return
        }
        localStorage.removeItem(DRAFT_KEY)
        setState([createNewTransaction()])
    }

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
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
                    <div className="grid grid-cols-1">
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-200 px-4 py-3">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Transaction Details
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the details of your transaction
                                        below.
                                    </p>
                                </div>

                                <div className="p-4">
                                    <TransactionBulkForm
                                        transactions={state}
                                        errors={validationError}
                                        onChange={handleInput}
                                        swapPosition={swapPosition}
                                        onDelete={deleteRow}
                                        onCopyDown={copyDown}
                                        draggedIndex={draggedIndex}
                                        dragOverIndex={dragOverIndex}
                                        onDragStart={handleDragStart}
                                        onDragOver={handleDragOver}
                                        onDragEnd={handleDragEnd}
                                        addRow={addRow}
                                        clearData={clearData}
                                        disabled={loading}
                                        onDateSortClick={onDateSortClick}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                                    <button
                                        disabled={loading}
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Create Transaction
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
