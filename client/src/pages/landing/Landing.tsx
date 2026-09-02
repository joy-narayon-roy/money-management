import Footer from "./Footer";
import Main from "./Main";
import Nav from "./Nav";
import style from "../../styles/pages/landing/index.module.css";

export default function Landing() {
    return (
        <div className={style.page}>
            <Nav />
            <Main />
            <Footer />
        </div>
    )
}
