import style from "../styles/pages/landing/index.module.css";
import logo_img from '../assets/logo-512x512.png'
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const nav = useNavigate()
    return (
        <div onClick={() => nav("/")} className={style.brand}>
            <div className={style.logoMark}>
                <img src={logo_img} alt="logo.png" />
            </div>
            <span>Money Manager</span>
        </div>
    );
}