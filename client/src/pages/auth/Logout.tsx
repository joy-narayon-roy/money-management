import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
// import { loginByEmailPassword } from "../../store/actions/authActions"
import { logout } from "../../store/reducers/authReducer"
// import { useNavigate } from "react-router-dom"

export default function Logout() {
    const authState = useSelector((state: RootState) => state.auth)
    // const nav = useNavigate()
    const dispatch = useDispatch()
    dispatch(logout())
    console.log(authState)

    return (
        <div>Logout</div>
    )
}
