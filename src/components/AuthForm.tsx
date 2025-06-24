"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/ui/loading-overlay";

type Props = {
  mode: "signin" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const isSignin = mode === "signin";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRules = [
    { test: (pw: string) => pw.length >= 8, message: "At least 8 characters" },
    {
      test: (pw: string) => /[A-Z]/.test(pw),
      message: "At least one uppercase letter",
    },
    {
      test: (pw: string) => /[a-z]/.test(pw),
      message: "At least one lowercase letter",
    },
    { test: (pw: string) => /\d/.test(pw), message: "At least one number" },
    {
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
      message: "At least one special character",
    },
  ];

  const firstUnmetPasswordRule = passwordRules.find(
    (rule) => !rule.test(password)
  );

  useEffect(() => {
    if (!isSignin) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          confirmPassword && password !== confirmPassword
            ? "Passwords do not match."
            : "",
      }));
    }
  }, [password, confirmPassword, isSignin]);

  const validateOnSubmit = () => {
    let hasError = false;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      hasError = true;
    } else if (!isSignin && firstUnmetPasswordRule) {
      newErrors.password = firstUnmetPasswordRule.message;
      hasError = true;
    }

    if (!isSignin && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateOnSubmit();
    setFormError(!isValid);

    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      console.log(`${mode.toUpperCase()} →`, { email, password });
      router.push("/dashboard");
    }, 1000); // simulate request
  };

  const renderError = (msg: string) => (
    <p className="flex items-center text-sm text-red-600 mb-3 mt-1">
      <ExclamationCircleIcon className="w-4 h-4 mr-1 text-red-600" />
      {msg}
    </p>
  );

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="min-h-screen flex items-center justify-center bg-[#FFEEA9] px-4">
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`bg-white p-8 rounded-2xl shadow-md w-full max-w-md transition-all ${
            formError ? "shake" : ""
          }`}
        >
          <h2 className="text-3xl font-bold text-center text-[#7B4019] mb-6 font-poppins">
            {isSignin ? "Sign In" : "Sign Up"}
          </h2>

          {/* Email Field */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 mb-1 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-[#FFBF78] ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-[#7B4019] bg-white"
            }`}
          />
          {errors.email && renderError(errors.email)}

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 mb-1 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-[#FFBF78] ${
              errors.password
                ? "border-red-500 bg-red-50"
                : "border-[#7B4019] bg-white"
            }`}
          />
          {!isSignin &&
            firstUnmetPasswordRule &&
            password &&
            renderError(firstUnmetPasswordRule.message)}
          {errors.password &&
            (!firstUnmetPasswordRule || isSignin) &&
            renderError(errors.password)}

          {/* Confirm Password Field (Sign Up only) */}
          {!isSignin && (
            <>
              <input
                type="password"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 mb-1 border rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-[#FFBF78] ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-50"
                    : "border-[#7B4019] bg-white"
                }`}
              />
              {errors.confirmPassword && renderError(errors.confirmPassword)}
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#7B4019] text-white font-semibold py-3 rounded-md hover:bg-[#5c2f10] transition font-poppins"
          >
            {isSignin ? "Sign In" : "Create Account"}
          </button>

          {/* Toggle Link */}
          <p className="mt-4 text-sm text-center text-[#7B4019] font-poppins">
            {isSignin ? (
              <>
                Don't have an account?{" "}
                <Link href="/sign-up" className="underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/sign-in" className="underline">
                  Sign In
                </Link>
              </>
            )}
          </p>
        </form>
      </div>
    </>
  );
}
