
import  Logo  from '../../components/Logo'

export default function Footer() {
    return (
        <footer>
            <Logo />
            <div className="footerLinks">
                <a href="#features">Features</a>
                <a href="#how">How it works</a>
                <a href="#reports">Reports</a>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
            </div>
            <span>© 2026 Money Manager</span>
        </footer>
    )
}
