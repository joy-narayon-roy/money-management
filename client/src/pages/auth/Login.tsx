import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthCard } from "../../components/auth/AuthCard";
import { AuthInput } from "../../components/auth/AuthInput";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { AuthButton } from "../../components/auth/AuthButton";
import type { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, } from "../../store/actions";
import type { RootState } from "../../store/reducers";
import { AuthError } from "../../components/auth/AuthError";
import { loginByEmailPassword } from "../../store/actions/authActions";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const authState = useSelector((s: RootState) => s.auth)
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
    dispatch(loginByEmailPassword(state))
  }

  const closeErrorMessage = () => {
    const action = clearAuthError()
    dispatch({ ...action })
  }

  const { email, password } = state
  const { loading, error, token } = authState

  useEffect(() => {
    if (token) {
      nav("/dashboard", {
      })
    }
  }, [token, nav])

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        description="Sign in to continue managing your money."
      >
        {error && (
          <AuthError
            message={error}
            onClose={closeErrorMessage}
          />
        )}

        <form
          onSubmit={handelFormSubmit}
          className="space-y-5"
        >
          <AuthInput
            id="email"
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={handelInput}
            required
          />

          <div className="space-y-2">
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={password}
              onChange={handelInput}
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[#1C9A6E] hover:text-[#153E30]"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <AuthButton
            type="submit"
            loading={loading}
          >
            Sign in
            <ArrowRight className="ml-2 h-4 w-4" />
          </AuthButton>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E8EEEB]" />

          <span className="text-xs text-[#A0AAA6]">
            OR
          </span>

          <div className="h-px flex-1 bg-[#E8EEEB]" />
        </div>

        <p className="text-center text-sm text-[#718079]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#1C9A6E] hover:text-[#153E30]"
          >
            Create account
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}