import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthCard } from "../../components/auth/AuthCard";
import { AuthInput } from "../../components/auth/AuthInput";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { AuthButton } from "../../components/auth/AuthButton";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // TODO:
      // Call your Go/Fiber register API here.
      //
      // await register({
      //   name,
      //   email,
      //   password,
      // });

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      console.log({
        name,
        email,
        password,
      });
    } finally {
      setLoading(false);
    }
  };

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
          <AuthInput
            id="name"
            label="Full name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />

          <AuthInput
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <PasswordInput
            name="password"
            id="password"
            label="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <PasswordInput
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
          />

          <p className="pt-1 text-xs leading-5 text-[#89958F]">
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
              className="font-semibold text-[#1C9A6E] hover:text-[#153E30]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}