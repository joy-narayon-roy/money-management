import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthCard } from "../../components/auth/AuthCard";
import { AuthInput } from "../../components/auth/AuthInput";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { AuthButton } from "../../components/auth/AuthButton";
import useAuthRegistration from "../../hooks/useAuthRegistration";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginByToken } from "../../store/reducers/authReducer";
import { useEffect } from "react";

export default function Register() {
  const {
    loading,
    error,
    form,
    validationError,
    updateFormData,
    submitFormData,
    clearError
  } = useAuthRegistration()

  const { isLoggedIn } = useSelector((s: RootState) => s.auth)
  const nav = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    submitFormData().then(token => {
      if (token) {
        localStorage.setItem("auth_token", token)
        dispatch(loginByToken(token))
      }
    })
  }

  const handelChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inp_name = ev.target.name as ("name" | "email" | "password" | "confirmPassword")
    const inp_value = ev.target.value
    updateFormData(inp_name, inp_value)
  }

  useEffect(() => {
    if (isLoggedIn) {
      nav("/dashboard")
    }
  }, [isLoggedIn, nav])


  const { name, email, password, confirmPassword } = form
  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        description="Start managing your money with clarity."
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Error Message */}
          {error && (
            <ErrorMessage error={error} setError={clearError} />
          )}

          <AuthInput
            id="name"
            label="Full name"
            type="text"
            name="name"
            placeholder="Enter your name"
            autoComplete="name"
            value={name}
            onChange={handelChange}
            error={validationError.name}
            required
          />

          <AuthInput
            id="email"
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={handelChange}
            error={validationError.email}

            required
          />

          <PasswordInput
            name="password"
            id="password"
            label="Password"
            value={password}
            onChange={handelChange}
            error={validationError.password}

            required
          />

          <PasswordInput
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            onChange={handelChange}
            error={validationError.confirmPassword}

            required
          />

          <p className="pt-1 text-xs leading-5 text-text-lite">
            By creating an account, you agree to our{" "}
            <Link
              to="/terms"
              className="font-medium text-[#1C9A6E]"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-[#1C9A6E]"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <AuthButton type="submit" loading={loading}>
            Create account
            <ArrowRight className="ml-2 h-4 w-4" />
          </AuthButton>
        </form>

        <div className="mt-6 border-t border-[#E8EEEB] pt-6">
          <p className="text-center text-sm text-[#718079]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary-hover"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}