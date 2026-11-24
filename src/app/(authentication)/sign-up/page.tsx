"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { AuthField } from "../_components/auth-field";
import {
  AtSignIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ShieldIcon,
  UserIcon,
  XIcon,
} from "../_components/icons";
import { PasswordToggle } from "../_components/password-toggle";
import {
  AuthDivider,
  SocialAuthButtons,
} from "../_components/social-auth-buttons";
import {
  validatePhoto,
  validateSignUp,
  type SignUpValues,
} from "../_lib/validation";

type TouchedFields = Partial<Record<keyof SignUpValues | "photo", boolean>>;

type PhotoSelection = { file: File; url: string };

const SignUpPage = () => {
  const [values, setValues] = useState<SignUpValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photo, setPhoto] = useState<PhotoSelection | null>(null);
  const [photoError, setPhotoError] = useState<string | undefined>();

  useEffect(() => {
    if (!photo) return;

    const url = photo.url;
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const errors = validateSignUp(values);

  const errorFor = (field: keyof SignUpValues) =>
    submitted || touched[field] ? errors[field] : undefined;

  const updateField =
    (field: keyof SignUpValues) => (value: string) => {
      setValidated(false);
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const touch = (field: keyof TouchedFields) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Allow picking the same file again after removing it.
    event.target.value = "";

    if (!file) return;

    const error = validatePhoto(file);

    if (error) {
      setPhotoError(error);
      return;
    }

    setPhotoError(undefined);
    setValidated(false);
    setTouched((prev) => ({ ...prev, photo: true }));
    setPhoto({ file, url: URL.createObjectURL(file) });
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoError(undefined);
    setValidated(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      photo: true,
    });

    const nextErrors = validateSignUp(values);
    const firstInvalid = (
      ["fullName", "email", "password", "confirmPassword"] as const
    ).find((field) => nextErrors[field]);

    const isValid = !firstInvalid && !photoError;
    setValidated(isValid);

    if (!isValid) {
      document.getElementById(firstInvalid ?? "photo")?.focus();
    }
  };

  const initials = values.fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const photoDescriptionIds = [
    "photo-hint",
    photoError ? "photo-error" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="flex flex-1 justify-center bg-[#f5f6f6] px-4 py-8 font-sans sm:px-6 sm:py-12">
      <section className="w-full max-w-[620px] self-start rounded-2xl bg-white px-5 py-8 shadow-[0_1px_3px_rgba(16,24,40,0.06)] ring-1 ring-black/[0.03] sm:px-9 sm:py-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
          Secure Access Portal
        </p>
        <h1 className="mt-3 text-[30px] font-medium leading-tight tracking-tight text-zinc-900 sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-zinc-500 sm:text-[15px]">
          Join your NHIMS workspace in a few simple steps.
        </p>

        <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
          <div className="space-y-2">
            <span className="block text-[13px] font-semibold text-zinc-800">
              Profile photo
            </span>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-lg font-semibold text-zinc-400 ring-1 ring-zinc-200 sm:size-[72px]">
                {photo ? (
                  <Image
                    alt="Profile photo preview"
                    className="size-full object-cover"
                    height={72}
                    src={photo.url}
                    unoptimized
                    width={72}
                  />
                ) : initials ? (
                  <span aria-hidden="true">{initials}</span>
                ) : (
                  <UserIcon className="size-6" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    accept="image/jpeg,image/png,image/webp"
                    aria-describedby={photoDescriptionIds}
                    aria-invalid={photoError ? true : undefined}
                    className="peer sr-only"
                    id="photo"
                    name="photo"
                    onChange={handlePhotoChange}
                    type="file"
                  />
                  <label
                    className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 peer-focus-visible:ring-4 peer-focus-visible:ring-teal-600/15"
                    htmlFor="photo"
                  >
                    {photo ? "Change photo" : "Choose photo"}
                  </label>
                  {photo ? (
                    <button
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/30"
                      onClick={removePhoto}
                      type="button"
                    >
                      <XIcon className="size-3.5" />
                      Remove
                    </button>
                  ) : null}
                </div>
                <p className="mt-2 text-xs text-zinc-500" id="photo-hint">
                  JPG, PNG or WebP. Max 2 MB.
                </p>
                {photoError ? (
                  <p
                    className="mt-2 text-xs font-medium text-red-600"
                    id="photo-error"
                  >
                    {photoError}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <AuthField
            autoComplete="name"
            error={errorFor("fullName")}
            icon={<UserIcon className="size-[18px]" />}
            id="fullName"
            label="Full name"
            onBlur={touch("fullName")}
            onChange={updateField("fullName")}
            placeholder="Sumon Ahmed"
            required
            value={values.fullName}
          />

          <AuthField
            autoComplete="email"
            error={errorFor("email")}
            icon={<AtSignIcon className="size-[18px]" />}
            id="email"
            label="Email address"
            onBlur={touch("email")}
            onChange={updateField("email")}
            placeholder="you@nhims.gov.bd"
            required
            type="email"
            value={values.email}
          />

          <AuthField
            autoComplete="new-password"
            error={errorFor("password")}
            hint="At least 8 characters with a letter and a number."
            icon={<ShieldIcon className="size-[18px]" />}
            id="password"
            label="Password"
            onBlur={touch("password")}
            onChange={updateField("password")}
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

          <AuthField
            autoComplete="new-password"
            error={errorFor("confirmPassword")}
            icon={<ShieldIcon className="size-[18px]" />}
            id="confirmPassword"
            label="Confirm password"
            onBlur={touch("confirmPassword")}
            onChange={updateField("confirmPassword")}
            placeholder="Re-enter your password"
            required
            trailing={
              <PasswordToggle
                onToggle={() =>
                  setShowConfirmPassword((visible) => !visible)
                }
                visible={showConfirmPassword}
              />
            }
            type={showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
          />

          {validated ? (
            <div
              className="flex items-start gap-2.5 rounded-lg border border-teal-200 bg-teal-50 px-3.5 py-3 text-[13px] font-medium text-teal-800"
              role="status"
            >
              <CheckCircleIcon className="mt-px size-4 shrink-0" />
              <span>Looks good — your details are validated.</span>
            </div>
          ) : null}

          <button
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/25"
            type="submit"
          >
            Create Account
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
          Already have an account?{" "}
          <Link
            className="font-semibold text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUpPage;
