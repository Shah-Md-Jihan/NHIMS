import type { ReactNode } from "react";

const GoogleIcon = () => (
  <svg aria-hidden="true" className="size-[18px] shrink-0" viewBox="0 0 24 24">
    <path
      d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"
      fill="#4285F4"
    />
    <path
      d="M12 22c2.7 0 4.96-.9 6.62-2.38l-3.24-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
      fill="#34A853"
    />
    <path
      d="M6.41 13.94a6 6 0 0 1 0-3.86V7.48H3.06a10 10 0 0 0 0 9.04l3.35-2.58Z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.48l3.35 2.6C7.2 7.72 9.4 5.96 12 5.96Z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg aria-hidden="true" className="size-[18px] shrink-0" viewBox="0 0 24 24">
    <path
      clipRule="evenodd"
      d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"
      fill="#1877F2"
      fillRule="evenodd"
    />
  </svg>
);

const socialButtonClass =
  "flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-4 text-[13px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/15";

export const SocialAuthButtons = () => (
  <div className="grid gap-3 sm:grid-cols-2">
    <button className={socialButtonClass} type="button">
      <GoogleIcon />
      <span>Continue with Google</span>
    </button>
    <button className={socialButtonClass} type="button">
      <FacebookIcon />
      <span>Continue with Facebook</span>
    </button>
  </div>
);

export const AuthDivider = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="h-px flex-1 bg-zinc-200" />
    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
      {children}
    </span>
    <span className="h-px flex-1 bg-zinc-200" />
  </div>
);
