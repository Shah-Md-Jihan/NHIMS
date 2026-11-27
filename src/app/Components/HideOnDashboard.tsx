"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The dashboard renders its own shell (sidebar + mobile top bar), so the
 * public site footer is hidden there.
 */
const HideOnDashboard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return <>{children}</>;
};

export default HideOnDashboard;
