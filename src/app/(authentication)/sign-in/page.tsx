"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { AuthField } from "../_components/auth-field";
import { AtSignIcon, ChevronRightIcon, ShieldIcon } from "../_components/icons";
import { PasswordToggle } from "../_components/password-toggle";
import {
  AuthDivider,
  SocialAuthButtons,
} from "../_components/social-auth-buttons";
import { validateSignIn, type SignInValues } from "../_lib/validation";

const SignInPage = () => {
  const [values, setValues] = useState<SignInValues>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof SignInValues, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const errors = validateSignIn(values);
  const errorFor = (field: keyof SignInValues) =>
    submitted || touched[field] ? errors[field] : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ email: true, password: true });

    const firstInvalid = (["email", "password"] as const).find(
      (field) => errors[field],
    );

    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f5f6f6] px-4 py-10 font-sans sm:px-6 sm:py-14">
      <section className="w-full max-w-[620px] rounded-2xl bg-white px-5 py-8 shadow-[0_1px_3px_rgba(16,24,40,0.06)] ring-1 ring-black/[0.03] sm:px-9 sm:py-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
          Secure Access Portal
        </p>
        <h1 className="mt-3 text-[30px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-500 sm:text-[15px]">
          Sign in to access your NHIMS workspace.
        </p>

        <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
          <AuthField
            autoComplete="email"
            error={errorFor("email")}
            icon={<AtSignIcon className="size-[18px]" />}
            id="email"
            label="Email address"
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            onChange={(email) => setValues((prev) => ({ ...prev, email }))}
            placeholder="sumon@nhims.gov.bd"
            required
            type="email"
            value={values.email}
          />

          <AuthField
            autoComplete="current-password"
            error={errorFor("password")}
            icon={<ShieldIcon className="size-[18px]" />}
            id="password"
            label="Password"
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            onChange={(password) => setValues((prev) => ({ ...prev, password }))}
            placeholder="••••••••"
            required
            trailing={
              <PasswordToggle
                onToggle={() => setShowPassword((visible) => !visible)}
                visible={showPassword}
              />
            }
            type={showPassword ? "text" : "password"}
            value={values.password}
          />

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <label className="flex cursor-pointer select-none items-center gap-2.5">
              <input
                className="peer sr-only"
                defaultChecked
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <span className="flex size-[18px] items-center justify-center rounded-[4px] border border-zinc-300 bg-white transition-colors peer-checked:border-teal-700 peer-checked:bg-teal-700 peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-4 peer-focus-visible:ring-teal-600/15">
                <svg
                  aria-hidden="true"
                  className="size-3 text-white opacity-0 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="text-[13px] text-zinc-600">Remember me</span>
            </label>
            <Link
              className="text-[13px] font-semibold text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/25"
            type="submit"
          >
            Sign In
            <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        <div className="mt-7">
          <AuthDivider>Or continue with</AuthDivider>
        </div>
        <div className="mt-4">
          <SocialAuthButtons />
        </div>

        <p className="mt-6 text-center text-[13px] text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignInPage;
