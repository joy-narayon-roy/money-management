import { useSelector } from "react-redux";
import Logo from "../../components/Logo";
import style from "../../styles/pages/landing/index.module.css";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";


export default function Nav() {
    const { isLoggedIn } = useSelector((s: RootState) => s.auth)
    return (
        <nav className={style.nav}>
            <Logo />
            <div className={style.navLinks}>
                <a href="#features">Features</a>
                <a href="#how">How it works</a>
                <a href="#reports">Reports</a>
            </div>
            <div className={style.navActions}>
                <Link
                    className={style.login}
                    to={isLoggedIn ? "/dashboard" : "/login"}
                >
                    {isLoggedIn ? "Dashboard" : "Log in"}
                </Link>

                <Link
                    to={"/register"}
                    className={style.navCta}
                >
                    Get started <span>→</span>
                </Link>

            </div>
        </nav>)
}
