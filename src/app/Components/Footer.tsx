import Link from "next/link";

const exploreLinks = [
  { label: "Find doctors", href: "/doctors" },
  { label: "Hospital directory", href: "/hospitals" },
  { label: "Medical specialties", href: "/specialties" },
  { label: "Diagnostic centers", href: "/diagnostic-centers" },
];

const platformLinks = [
  { label: "About the platform", href: "/about" },
  { label: "Contact & support", href: "/contact" },
  { label: "Pharmacy directory", href: "/pharmacies" },
  { label: "Provider login", href: "/provider/sign-in" },
];

const LogoMark = () => (
  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#26bfa0] text-white">
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

const ShieldIcon = () => (
  <svg
    aria-hidden="true"
    className="size-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.7"
    viewBox="0 0 24 24"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a2f27] text-[#9db8b1]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-8">
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-6">
            <Link className="inline-flex items-center gap-3" href="/">
              <LogoMark />
              <span className="flex flex-col">
                <span className="text-2xl font-bold leading-none tracking-tight text-white">
                  NHIMS
                </span>
                <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#8fb3aa]">
                  Bangladesh
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[13px] leading-relaxed">
              Connecting people, providers, and health information across
              Bangladesh through one trusted national platform.
            </p>

            <p className="mt-6 flex items-center gap-2 text-[13px]">
              <ShieldIcon />
              Privacy-first digital health infrastructure
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-[13px] font-semibold text-white">Explore</h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-[13px] transition-colors hover:text-white"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="NHIMS">
            <h2 className="text-[13px] font-semibold text-white">NHIMS</h2>
            <ul className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-[13px] transition-colors hover:text-white"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-semibold text-white">
              National support
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <span className="block text-[13px]">
                  Health service information
                </span>
                <a
                  className="mt-1 block text-base font-semibold text-white hover:underline"
                  href="tel:16263"
                >
                  16263
                </a>
              </li>
              <li>
                <span className="block text-[13px]">Technical support</span>
                <a
                  className="mt-1 block break-all text-sm font-semibold text-white hover:underline"
                  href="mailto:support@nhims.gov.bd"
                >
                  support@nhims.gov.bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#7f9a93] sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} NHIMS Academic Prototype</p>
          <p className="flex items-center gap-2">
            <span lang="bn">বাংলা</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-white/80">English</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
