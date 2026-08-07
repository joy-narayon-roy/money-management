import { Link } from "react-router-dom"


type NavLinks = {
    path: string
    text: string
}
export default function Navbar() {

    const links: NavLinks[] = [
        {
            path: "/dashboard",
            text: "Dashboard"
        },
        {
            path: "/profile",
            text: "Profile"
        },
        {
            path: "/login",
            text: "Login"
        },
        {
            path: "/register",
            text: "Register"
        },
    ]
    return (
        <div>
            <ul>
                {links.map((l, i) => <li key={i}><Link to={l.path}>{l.text}</Link></li>)}
            </ul>
        </div>
    )
}
