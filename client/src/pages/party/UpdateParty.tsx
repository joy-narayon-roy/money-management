import { useParams, } from "react-router-dom"
import type { RootState } from "../../store"
import { useSelector } from "react-redux"
import { Loading } from "../../components/Loading"
import { NotFound } from "../../components/NotFound"
import UpdatePartyInfo from "../../components/partyUpdate/UpdatePartyInfo"

export default function UpdateParty() {
    const { id } = useParams()
    const { loading, user } = useSelector((s: RootState) => s.user)
    const token = useSelector((s: RootState) => s.auth.token) || ""
    const party = (user?.parties || []).filter(p => p.id === id)[0]


    if (loading) {
        return <Loading />
    }
    if (!loading && !party) {
        return <NotFound title="Party not found!" />
    }
    return (
        <UpdatePartyInfo party={party} token={token} />
    )
}
