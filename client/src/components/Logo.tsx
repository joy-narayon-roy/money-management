import style from "../styles/pages/landing/index.module.css";
import logo_img from '../assets/logo-512x512.png'

export default function Logo() {
    return (
        <div className={style.brand}>
            <div className={style.logoMark}>
                <img src={logo_img} alt="logo.png" />
            </div>
            <span>Money Manager</span>
        </div>
    );
}