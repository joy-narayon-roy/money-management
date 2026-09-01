import style from '../styles/components/button.module.css'
interface Props {
    children?: React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
    className?: string | undefined
}
export default function Button(props: Props) {
    const {
        type = "button",
        children = <></>,
        onClick = () => { },
        className = "",
        disabled
    } = props
    return (
        <button
            type={type}
            className={`${style.btn} ${className}`}
            // className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
