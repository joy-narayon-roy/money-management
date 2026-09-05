import style from './styles/button.module.css'
interface Props {
    children?: React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
    className?: string | undefined
}
export default function ButtonPrimary(props: Props) {
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
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
