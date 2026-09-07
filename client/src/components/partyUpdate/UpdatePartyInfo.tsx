import { useState } from "react"
import type { CreatePartyFormData, Party, PartyFormDataValidationError } from "../../types/party"
import PageHeading from "../global/PageHeadeing"
import PartyForm from "../partyCreate/PartyForm"
import ButtonCancel from "../ButtonCancel"
import ButtonPrimary from "../ButtonPrimary"
import api from "../../api"
import { updatePary } from "../../store/reducers/userReducer"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store"
import { useNavigate } from "react-router-dom"

type Props = {
    party?: Party
    token: string
}
export default function UpdatePartyInfo(props: Props) {
    const { party } = props
    const [loading, setLoading] = useState(false)
    const [verr, setVerr] = useState<PartyFormDataValidationError>({})
    const [state, setState] = useState<CreatePartyFormData>({
        name: party?.name || "",
        description: party?.description || "",
        role: party?.role || "INCOME"
    })
    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    if (!party) {
        return
    }

    const handleChange = (
        field: keyof CreatePartyFormData,
        value: string
    ) => {
        if (field === "role") {
            return
        }
        setState(pre => ({
            ...pre,
            [field]: value
        }))
    };

    const handleSubmit = (ev: React.SubmitEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setLoading(true)
        setVerr(pre => pre)
        api.party.updatePartyRequest(props.token, party.id, state).then(({ data }) => {
            dispatch(updatePary({ party: data }))
            nav("../")
        }).
            finally(() => {
                setLoading(false)
            })
        // setLoading(false)
        // setVerr(pre => pre)
    }


    const bc = [{ label: "Parties", to: "/parties" }, { label: "Update Party" }]

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
                                        Party Details
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the details of your party below.
                                    </p>
                                </div>

                                {/* Error Message */}
                                {/* {error && (
                                    <ErrorMessage error={error} setError={clearError} />
                                )} */}

                                <div className="p-6">
                                    <PartyForm
                                        form={state}
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
                                    <ButtonPrimary
                                        loading={loading}
                                        type="submit"
                                    >
                                        Update Party
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
