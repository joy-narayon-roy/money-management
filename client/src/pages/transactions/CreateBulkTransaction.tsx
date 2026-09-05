import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { TransactionBulkForm } from "../../components/transactionBulkCreate";
import type { BulkTransactionResponse, CreateTransactionFormData, TransactionError, TransactionType } from "../../types/transaction";
import { createNewTransaction, DRAFT_KEY, loadTransactionDraft, saveTransactionDraft } from "../../utils/transaction";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonCancel from "../../components/ButtonCancel";
import PageHeading from "../../components/global/PageHeadeing";
import api from "../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import data from "../../data";
import snake_to_titlecase from "../../utils/snake_to_titlecase";
import TransactionTemplateModal from "../../modal/TransactionTemplateModal";



export default function CreateBulkTransaction() {
    const { token } = useSelector((s: RootState) => s.auth)
    const parties = useSelector((s: RootState) => s.user.user?.parties) || []

    const [sp] = useSearchParams({})
    const transaction_type_sp = (sp.get("type") || "").toUpperCase()
    const fixed_transaction_type: TransactionType | null = data.options.transaction.types.filter(p => p === transaction_type_sp)[0] || null

    const [templateModalShow, setTemplateModalShow] = useState<number>(-1)
    const [state, setState] = useState<CreateTransactionFormData[]>(loadTransactionDraft({
        notEmpty: true,
        formData: {
            type: fixed_transaction_type || undefined
        }
    }));
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState<TransactionError[]>([])

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const nav = useNavigate()

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
                if (i !== index) {
                    return transaction
                }

                if (fixed_transaction_type && transaction.type != fixed_transaction_type) {
                    transaction.type = fixed_transaction_type
                }

                if (key === "party_id" && transaction.description === "") {
                    transaction.description = parties.filter(p => p.id === value)[0]?.description || ""
                }

                if (key === "amount") {
                    return {
                        ...transaction,
                        amount: Number(String(value).replace(/^0+(?=\d)/, "")),
                    }
                }

                return {
                    ...transaction,
                    [key]: value,
                }
            })
        );
    };

    const addRow = () => {
        const new_tr = createNewTransaction()
        if (fixed_transaction_type) {
            new_tr.type = fixed_transaction_type
        }
        setState((prev) => [...prev, new_tr]);
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

    const openTemplateModal = (index: number) => {
        setTemplateModalShow(index)
    }

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
        api.createBulkTransaction(token, state)
            .then(data => {
                deleteDraft()

                type MapReducerType = {
                    state: (CreateTransactionFormData | null)[];
                    val_errors: TransactionError[];
                };

                const val_err = Object.values(data.validation_errors).map(d => d)

                const { state: new_state, val_errors: new_val_err } = val_err.reduce<MapReducerType>((pre: MapReducerType, curr, i) => {
                    pre.state = pre.state.map((v, ci) => {
                        if ((!curr) && ci === i) {
                            return null
                        }
                        return v
                    })

                    if (curr) {
                        pre.val_errors.push(curr)
                    }
                    return pre
                }, {
                    state: [...state],
                    val_errors: []
                })


                if (new_state.length === 0 || new_val_err.length === 0) {
                    deleteDraft()
                    nav("/transactions")
                } else {
                    setState(new_state.filter(
                        (v): v is CreateTransactionFormData => v !== null
                    ))
                    setValidationError(new_val_err)
                }

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
    }
    const clearData = () => {
        const ok = confirm("Want to clean Transactions?")
        if (!ok) {
            return
        }
        localStorage.removeItem(DRAFT_KEY)
        setState([createNewTransaction()])
    }

    useEffect(() => {
        saveTransactionDraft(state)
    }, [state])

    const transaction_type_title = snake_to_titlecase(fixed_transaction_type || "")

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <PageHeading
                    breadcrumbs={[{ label: "Transactions", to: "/transactions" }, { label: "New Bulk " + transaction_type_title + " Transaction" }]}
                    title={`Create Bulk ${transaction_type_title} Transaction`}
                />
                <TransactionTemplateModal
                    isOpen={templateModalShow >= 0}
                    onClose={() => setTemplateModalShow(-1)}
                />

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

                                <div className="py-4 px-2">
                                    <TransactionBulkForm
                                        fixed_date={fixed_transaction_type}
                                        fixed_type={fixed_transaction_type}
                                        transactions={state}
                                        errors={validationError}
                                        dragOverIndex={dragOverIndex}
                                        draggedIndex={draggedIndex}
                                        disabled={loading}
                                        onDragStart={handleDragStart}
                                        onChange={handleInput}
                                        swapPosition={swapPosition}
                                        onDelete={deleteRow}
                                        onCopyDown={copyDown}
                                        onDragOver={handleDragOver}
                                        onDragEnd={handleDragEnd}
                                        addRow={addRow}
                                        clearData={clearData}
                                        onDateSortClick={onDateSortClick}
                                        openTemplateModal={openTemplateModal}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                                    <ButtonCancel
                                        disabled={loading}
                                        onClick={() => window.history.back()}
                                    />
                                    <ButtonPrimary
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Create Transaction
                                    </ButtonPrimary>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
