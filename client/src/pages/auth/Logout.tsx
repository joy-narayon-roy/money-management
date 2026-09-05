import { useDispatch } from "react-redux"
import { logout } from "../../store/reducers/authReducer"

export default function Logout() {
    const dispatch = useDispatch()
    dispatch(logout())

    return (
        <div>Logout</div>
    )
}
