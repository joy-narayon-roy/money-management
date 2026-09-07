import { Link, useParams } from 'react-router-dom'
import useTransactionDetails from '../../hooks/useTransactionDetails'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { Loading } from '../../components/Loading'
import { ArrowLeft } from 'lucide-react'

export default function TransactionDetails() {
    const token = useSelector((s: RootState) => s.auth.token)
    const { id = "" } = useParams()
    const { loading, transaction } = useTransactionDetails(token || "", id)


    if (loading) {
        return <Loading />
    }
    console.log(transaction)
    return (
        <>
            <div className='text-center'>Transaction Info : {transaction?.description || "Comming Soon!"}</div>
            <Link className='flex flex-row items-center mx-auto justify-center mt-5 gap-2 text-primary' to={"../"}><ArrowLeft size={18} /> Go Back</Link>
        </>
    )
}
