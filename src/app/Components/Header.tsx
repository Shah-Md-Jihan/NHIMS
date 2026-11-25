"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/doctors" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Specialties", href: "/specialties" },
  { label: "Diagnostic Centers", href: "/diagnostic-centers" },
  { label: "About Us", href: "/about" },
] as const;

const LogoMark = () => (
  <span className="flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-[#1aa38b] text-white sm:size-11 sm:rounded-xl">
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M19.5 13.6c1.3-1.28 2.5-2.8 2.5-4.8A4.8 4.8 0 0 0 17.2 4c-1.54 0-2.62.44-3.93 1.75L12 7.02l-1.27-1.27C9.42 4.44 8.34 4 6.8 4A4.8 4.8 0 0 0 2 8.8c0 2 1.2 3.52 2.5 4.8L12 21l7.5-7.4Z" />
      <path d="M3.5 12h4l1.4-2.8 2.8 5.6 1.4-2.8h4.1" />
    </svg>
  </span>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.7"
    viewBox="0 0 24 24"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M8 2v4M16 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    {open ? (
      <path d="M18 6 6 18M6 6l12 12" />
    ) : (
      <path d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-2 px-4 sm:h-[72px] sm:gap-4 sm:px-6 lg:px-8">
        <Link
          className="inline-flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:gap-3"
          href="/"
        >
          <LogoMark />
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-none tracking-tight text-zinc-900 sm:text-2xl">
              NHIMS
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase leading-none tracking-[0.22em] text-zinc-500 sm:mt-1.5 sm:text-[10px]">
              Bangladesh
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="mx-auto hidden items-center gap-0.5 xl:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                  active
                    ? "bg-[#e8f5f1] font-semibold text-[#0d8a76]"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-3 xl:ml-0">
          <Link
            aria-label="Login or register"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] font-medium text-zinc-600 transition-colors hover:text-[#0d8a76] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:px-1.5"
            href="/sign-in"
          >
            <UserIcon className="size-[18px] shrink-0" />
            <span className="hidden sm:inline">Login / Register</span>
          </Link>

          <Link
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0d8a76] px-3 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#0a7362] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:px-5 sm:text-sm"
            href="/appointments/book"
          >
            <CalendarIcon className="size-[18px] shrink-0" />
            <span className="hidden sm:inline">Book appointment</span>
            <span className="sm:hidden">Book</span>
          </Link>

          <button
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Mobile"
          className="border-t border-zinc-200/80 bg-white xl:hidden"
          id="mobile-nav"
        >
          <ul className="mx-auto flex w-full max-w-[1440px] flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#e8f5f1] font-semibold text-[#0d8a76]"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-zinc-200/80 pt-3 sm:hidden">
              <Link
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
              >
                <UserIcon className="size-[18px] shrink-0" />
                Login / Register
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
