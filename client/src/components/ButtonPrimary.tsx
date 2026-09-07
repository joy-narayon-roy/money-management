import { Loading } from './Loading'
import style from './styles/button.module.css'
interface Props {
    children?: React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
    className?: string | undefined
    loading?: boolean
}
export default function ButtonPrimary(props: Props) {
    const {
        type = "button",
        children = <></>,
        onClick = () => { },
        className = "",
        disabled,
        loading
    } = props
    return (
        <button
            type={type}
            className={`${style.btn} ${className}`}
            onClick={onClick}
            disabled={loading || disabled}
        >

            {loading ? <Loading text='' icone_color='text-white' /> : children}
        </button>
    )
}
