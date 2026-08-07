import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store"
import { login } from "../store/actions"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const dispatch = useDispatch<AppDispatch>()
    const nav = useNavigate()

    const [state, setState] = useState({
        email: "",
        password: ""
    })


    const handelInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setState(pre => ({ ...pre, [ev.target.name]: ev.target.value }))
    }

    const handelFormSubmit = (ev: React.SubmitEvent<HTMLFormElement>) => {
        ev.preventDefault()
        ev.target.reportValidity()
        dispatch(login(state))
        nav("/dashboard", {
        })
    }

    const { email, password } = state
    return (
        <form onSubmit={handelFormSubmit}>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div>
                <label>Email :</label>
                <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handelInput}
                />
            </div>
            <div>
                <label>Password :</label>
                <input
                    required
                    type="password"
                    maxLength={10}
                    name="password"
                    value={password}
                    onChange={handelInput}
                />
            </div>
            <button>Submit</button>

        </form>
    )
}
