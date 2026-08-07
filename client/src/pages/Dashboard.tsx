import { useSelector } from "react-redux"
import type { RootState } from "../store"

export default function Dashboard() {
  const auth = useSelector((state: RootState) => state.auth)
  const user = useSelector((state: RootState) => state.user)
  console.log(auth)
  console.log(user)
  return (
    <div>
      <h3>Dashboard</h3>
      <h5>{auth.isLoggedIn ? "Loged in user" : "Please login first "}</h5>
    </div>
  )
}
