import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";

import PartyForm from "../../components/partyCreate/PartyForm";
import ErrorMessage from "../../components/ErrorMessage";
import useCreateParty from "../../hooks/useCreateParty";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { addParty } from "../../store/reducers/userReducer";
import PageHeading from "../../components/global/PageHeadeing";
import ButtonCancel from "../../components/ButtonCancel";

export default function CreateParty() {
    const token = useSelector((s: RootState) => s.auth.token);
    const {
        form,
        loading,
        error,
        validationError: verr,
        createParty,
        clearError,
        handleChange,
    } = useCreateParty(token)

    const nav = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createParty(form).then((value) => {
            if (value) {
                dispatch(addParty({ party: value }))
                nav("../")
            }
        })
    };

    const bc = [{ label: "Parties", to: "/parties" }, { label: "New Party" }]
   
    return (
        <div className="px-4 py-2 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Page Header */}
                <PageHeading
                    breadcrumbs={bc}
                    title="Create Party"
                />

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                <div className="border-b border-gray-200 p-6">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Part Details
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the details of your party below.
                                    </p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <ErrorMessage error={error} setError={clearError} />
                                )}

                                <div className="p-6">
                                    <PartyForm
                                        form={form}
                                        onChange={handleChange}
                                        validation_error={verr}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                                    <ButtonCancel
                                        type="button"
                                        onClick={() =>
                                            window.history.back()
                                        }
                                    />
                                    <ButtonPrimary disabled={loading} type="submit">
                                        Create Party
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
