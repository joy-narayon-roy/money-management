import { Link, type To } from "react-router-dom"
import style from './styles/linkButton.module.css'

interface Props {
    to?: To
    children?: React.ReactNode
}

export default function LinkButton({ children, to = "/" }: Props) {
    return <Link
        className={`${style['link-btn']}`}
        to={to}
    >
        {children}
    </Link>
}