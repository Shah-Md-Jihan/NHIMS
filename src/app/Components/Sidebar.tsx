"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";

type IconProps = { className?: string };

const Icon = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
);

const HomeIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M3 10.75 12 3l9 7.75" />
    <path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-5.5h4V21h3.5a1 1 0 0 0 1-1V9.5" />
  </Icon>
);

const HospitalIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
    <path d="M14 9h5a1 1 0 0 1 1 1v11" />
    <path d="M2 21h20" />
    <path d="M9 8v6M6 11h6" />
  </Icon>
);

const UserPlusIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" />
  </Icon>
);

const UserIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

const FlaskIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M9 3h6" />
    <path d="M10 3v6.5L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.5V3" />
    <path d="M7.5 15h9" />
  </Icon>
);

const PharmacyIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M3 9h18l-1.2-5H4.2L3 9Z" />
    <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
    <path d="M9 21v-6h6v6" />
    <path d="M12 10v3M10.5 11.5h3" />
  </Icon>
);

const ShieldIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const ChartIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M3 21h18" />
    <path d="M6 21v-7M12 21V7M18 21v-4" />
  </Icon>
);

const SettingsIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
  </Icon>
);

const ClipboardIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect height="4" rx="1" width="8" x="8" y="2" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6M9 16h4" />
  </Icon>
);

const CalendarIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </Icon>
);

const PillIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="m10.5 20.5-7-7a4.95 4.95 0 0 1 7-7l7 7a4.95 4.95 0 0 1-7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </Icon>
);

const LogoutIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </Icon>
);

const ChevronRightIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

const PanelLeftCloseIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect height="18" rx="2" width="18" x="3" y="3" />
    <path d="M9 3v18" />
    <path d="m17 9-3 3 3 3" />
  </Icon>
);

const PanelLeftOpenIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect height="18" rx="2" width="18" x="3" y="3" />
    <path d="M9 3v18" />
    <path d="m14 9 3 3-3 3" />
  </Icon>
);

const MenuIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
);

const XIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);

const LogoMark = ({ className }: IconProps) => (
  <span
    className={`flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#22b79b] to-[#0d8a76] text-white shadow-sm ${className ?? ""}`}
  >
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

type DashboardRole = "admin" | "doctor" | "patient";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
};

const dashboardLinks: Record<DashboardRole, NavItem[]> = {
  admin: [
    {
      id: "overview",
      label: "Overview",
      href: "/dashboard/admin",
      icon: HomeIcon,
    },
    {
      id: "hospitals",
      label: "Hospitals & Clinics",
      href: "/dashboard/admin/hospitals",
      icon: HospitalIcon,
    },
    {
      id: "doctors",
      label: "Doctors",
      href: "/dashboard/admin/doctors",
      icon: UserPlusIcon,
    },
    {
      id: "patients",
      label: "Patients",
      href: "/dashboard/admin/patients",
      icon: UserIcon,
    },
    {
      id: "diagnostic-centers",
      label: "Diagnostic Centers",
      href: "/dashboard/admin/diagnostic-centers",
      icon: FlaskIcon,
    },
    {
      id: "pharmacies",
      label: "Pharmacies",
      href: "/dashboard/admin/pharmacies",
      icon: PharmacyIcon,
    },
    {
      id: "user-management",
      label: "User Management",
      href: "/dashboard/admin/users",
      icon: ShieldIcon,
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      href: "/dashboard/admin/reports",
      icon: ChartIcon,
    },
    {
      id: "settings",
      label: "System Settings",
      href: "/dashboard/admin/settings",
      icon: SettingsIcon,
    },
    {
      id: "audit-logs",
      label: "Audit Logs",
      href: "/dashboard/admin/audit-logs",
      icon: ClipboardIcon,
    },
  ],
  doctor: [
    {
      id: "overview",
      label: "Overview",
      href: "/dashboard/doctor",
      icon: HomeIcon,
    },
    {
      id: "my-patients",
      label: "My Patients",
      href: "/dashboard/doctor/patients",
      icon: UserPlusIcon,
    },
    {
      id: "appointments",
      label: "Appointments",
      href: "/dashboard/doctor/appointments",
      icon: CalendarIcon,
    },
    {
      id: "medical-records",
      label: "Medical Records",
      href: "/dashboard/doctor/records",
      icon: ClipboardIcon,
    },
    {
      id: "prescriptions",
      label: "E-Prescriptions",
      href: "/dashboard/doctor/prescriptions",
      icon: PillIcon,
    },
    {
      id: "lab-reports",
      label: "Lab Reports",
      href: "/dashboard/doctor/lab-reports",
      icon: FlaskIcon,
    },
    {
      id: "profile",
      label: "My Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
    },
  ],
  patient: [
    {
      id: "overview",
      label: "Overview",
      href: "/dashboard/patient",
      icon: HomeIcon,
    },
    {
      id: "find-doctors",
      label: "Find Doctors",
      href: "/dashboard/patient/doctors",
      icon: UserPlusIcon,
    },
    {
      id: "appointments",
      label: "Appointments",
      href: "/dashboard/patient/appointments",
      icon: CalendarIcon,
    },
    {
      id: "medical-records",
      label: "Medical Records",
      href: "/dashboard/patient/records",
      icon: ClipboardIcon,
    },
    {
      id: "prescriptions",
      label: "E-Prescriptions",
      href: "/dashboard/patient/prescriptions",
      icon: PillIcon,
    },
    {
      id: "lab-reports",
      label: "Lab Reports",
      href: "/dashboard/patient/lab-reports",
      icon: FlaskIcon,
    },
    {
      id: "profile",
      label: "My Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
    },
  ],
};

const roleMeta: Record<
  DashboardRole,
  { title: string; initial: string; dotClass: string }
> = {
  admin: { title: "Super Admin", initial: "A", dotClass: "bg-violet-600" },
  doctor: {
    title: "Medicine Specialist",
    initial: "D",
    dotClass: "bg-teal-600",
  },
  patient: { title: "Patient", initial: "P", dotClass: "bg-sky-600" },
};

const COLLAPSE_KEY = "nhims.sidebar.collapsed";
const collapseListeners = new Set<() => void>();

const subscribeCollapsed = (listener: () => void) => {
  collapseListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === COLLAPSE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    collapseListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

const getCollapsedSnapshot = () =>
  window.localStorage.getItem(COLLAPSE_KEY) === "true";
const getCollapsedServerSnapshot = () => false;
const setCollapsedPreference = (value: boolean) => {
  window.localStorage.setItem(COLLAPSE_KEY, String(value));
  collapseListeners.forEach((listener) => listener());
};

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const collapsed = useSyncExternalStore(
    subscribeCollapsed,
    getCollapsedSnapshot,
    getCollapsedServerSnapshot,
  );
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const mobileOpen = openPath === pathname;

  const role = (session?.user?.role ?? "patient") as DashboardRole;
  const meta = roleMeta[role];
  const dotClass = isPending ? "bg-zinc-300" : meta.dotClass;
  const initial = isPending ? "…" : meta.initial;
  const links = dashboardLinks[role];
  const overviewHref = `/dashboard/${role}`;

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === overviewHref
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.push("/sign-in");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-200/80 bg-white/95 px-4 backdrop-blur lg:hidden">
        <button
          aria-controls="dashboard-sidebar"
          aria-expanded={mobileOpen}
          aria-label="Open dashboard menu"
          className="inline-flex size-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40"
          onClick={() => setOpenPath(pathname)}
          type="button"
        >
          <MenuIcon className="size-5" />
        </button>
        <Link className="flex min-w-0 items-center gap-2.5" href={overviewHref}>
          <LogoMark className="size-9 rounded-xl" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-lg font-bold leading-none tracking-tight text-zinc-900">
              NHIMS
            </span>
            <span className="mt-1 truncate text-[8px] font-medium uppercase leading-none tracking-[0.22em] text-zinc-500">
              Bangladesh
            </span>
          </span>
        </Link>
        <span
          aria-label={`Signed in as ${meta.title}`}
          className={`ml-auto flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${dotClass}`}
        >
          {initial}
        </span>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpenPath(null)}
        role="presentation"
      />

      <aside
        aria-label="Dashboard sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[280px] flex-col border-r border-zinc-200/80 bg-white shadow-xl transition-[width,transform] duration-200 ease-out lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 lg:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-[76px]" : "lg:w-[272px]"}`}
        id="dashboard-sidebar"
      >
        <div
          className={`relative flex items-center gap-3 px-5 pb-4 pt-6 ${collapsed ? "lg:px-3.5" : ""}`}
        >
          <Link
            className={`flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 ${collapsed ? "lg:justify-center" : ""}`}
            href={overviewHref}
            title="NHIMS Bangladesh"
          >
            <LogoMark />
            <span
              className={`flex min-w-0 flex-col ${collapsed ? "lg:hidden" : ""}`}
            >
              <span className="truncate text-[22px] font-bold leading-none tracking-tight text-zinc-900">
                NHIMS
              </span>
              <span className="mt-1.5 truncate text-[10px] font-medium uppercase leading-none tracking-[0.22em] text-zinc-500">
                Bangladesh
              </span>
            </span>
          </Link>
          <button
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-8 z-10 hidden size-6 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-teal-600/40 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 lg:flex"
            onClick={() => setCollapsedPreference(!collapsed)}
            type="button"
          >
            {collapsed ? (
              <PanelLeftOpenIcon className="size-3.5" />
            ) : (
              <PanelLeftCloseIcon className="size-3.5" />
            )}
          </button>
          <button
            aria-label="Close dashboard menu"
            className="ml-auto inline-flex size-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 lg:hidden"
            onClick={() => setOpenPath(null)}
            type="button"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div
          className={`mx-3 rounded-xl border border-zinc-200/80 bg-[#f7f9f8] px-3.5 py-3 ${collapsed ? "lg:mx-2 lg:px-0" : ""}`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`size-2 shrink-0 rounded-full ${dotClass} ${collapsed ? "lg:hidden" : ""}`}
            />
            <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Signed in as
              </p>
              <p className="mt-0.5 truncate text-[13px] font-bold text-zinc-900">
                {isPending ? "Loading…" : meta.title}
              </p>
            </div>
            <span
              aria-hidden="true"
              className={`mx-auto hidden size-9 items-center justify-center rounded-full text-xs font-bold text-white ${collapsed ? "lg:flex" : ""} ${dotClass}`}
            >
              {initial}
            </span>
          </div>
        </div>

        <nav
          aria-label="Dashboard"
          className="mt-5 flex-1 overflow-y-auto px-3 pb-4 [scrollbar-width:thin]"
        >
          <p
            className={`px-3 pb-2 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-zinc-400 ${collapsed ? "lg:hidden" : ""}`}
          >
            Workspace
          </p>
          <ul aria-busy={isPending} className="space-y-1">
            {isPending
              ? Array.from({ length: 7 }).map((_, index) => (
                  <li key={`nav-skeleton-${index}`}>
                    <div className="h-10 animate-pulse rounded-lg bg-zinc-100" />
                  </li>
                ))
              : links.map((item) => {
                  const ItemIcon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={item.id}>
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 ${collapsed ? "lg:justify-center lg:px-0" : ""} ${active ? "bg-[#e8f5f1] font-semibold text-[#0d8a76]" : "font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}`}
                        href={item.href}
                        title={collapsed ? item.label : undefined}
                      >
                        <ItemIcon
                          className={`size-[18px] ${active ? "text-[#0d8a76]" : "text-zinc-500 group-hover:text-zinc-700"}`}
                        />
                        <span
                          className={`truncate ${collapsed ? "lg:hidden" : ""}`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </nav>

        <div className="mt-auto space-y-2 border-t border-zinc-200/70 px-3 py-4">
          <Link
            className={`flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-[#f7f9f8] px-3 py-2.5 transition-colors hover:border-teal-600/30 hover:bg-[#eef7f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 ${collapsed ? "lg:justify-center lg:border-0 lg:bg-transparent lg:px-0" : ""}`}
            href="/"
            title="Back to public site"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f5f1] text-[#0d8a76]">
              <HomeIcon className="size-[18px]" />
            </span>
            <span className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
              <span className="block truncate text-[13px] font-bold text-[#0d8a76]">
                Back to public site
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-zinc-500">
                Explore doctors &amp; hospitals
              </span>
            </span>
            <ChevronRightIcon
              className={`size-4 shrink-0 text-zinc-400 ${collapsed ? "lg:hidden" : ""}`}
            />
          </Link>
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 disabled:cursor-not-allowed disabled:opacity-60 ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
            disabled={signingOut}
            onClick={handleSignOut}
            title="Sign out"
            type="button"
          >
            <LogoutIcon className="size-[18px] shrink-0 text-zinc-500" />
            <span className={collapsed ? "lg:hidden" : ""}>
              {signingOut ? "Signing out…" : "Sign out"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
