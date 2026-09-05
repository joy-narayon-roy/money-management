import { X } from "lucide-react"
import style from './styles/error_message.module.css'
type Props = {
    error?: string | null
    setError?: (string: string) => void
}
export default function ErrorMessage({
    error,
    setError = () => { }
}: Props) {
    if (!error || error == "") {
        return <></>
    }
    return (
        <div className={style.error_container}>
            <div
                role="alert"
                className={style.error}
            >
                <div className={style.error_message}>
                    <span>{error}</span>
                </div>

                <button
                    type="button"
                    onClick={() => setError("")}
                    className={style.error_close_btn}
                    aria-label="Close error message"
                    title="Close"
                >
                    <X size={18} />
                </button>
            </div>
        </div>)
}
