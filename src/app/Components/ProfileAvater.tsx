"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ProfileUser = {
  name?: string | null;
  email?: string | null;
  role?: string | null;
  image?: string | null;
};

const getDashboardHref = (role?: string | null) => {
  if (role === "admin") return "/dashboard/admin";
  if (role === "doctor") return "/dashboard/doctor";
  return "/dashboard/patient";
};

const ProfileAvater = ({ user }: { user: ProfileUser }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const name = user.name?.trim() || "User";
  const image = user.image?.trim() || "";
  const initial = name.charAt(0).toUpperCase();
  const dashboardHref = getDashboardHref(user.role);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open profile menu"
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-[#e8f5f1] text-sm font-semibold text-[#0d8a76] transition hover:border-teal-600/40 hover:bg-[#dff1eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="size-full object-cover"
            unoptimized
          />
        ) : (
          <span>{initial}</span>
        )}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Profile menu"
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-zinc-200/80 bg-white p-2 shadow-[0_10px_30px_rgba(16,24,40,0.08)]"
        >
          <div className="border-b border-zinc-100 px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-zinc-900">{name}</p>
            {user.email ? (
              <p className="mt-0.5 truncate text-xs text-zinc-500">{user.email}</p>
            ) : null}
          </div>

          <Link
            role="menuitem"
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40"
          >
            Dashboard
          </Link>

          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileAvater;
