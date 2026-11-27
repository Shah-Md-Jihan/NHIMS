import Sidebar from "@/app/Components/Sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f6] lg:flex-row">
      <Sidebar />

      <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-8">
        <div className="mx-auto w-full max-w-[1240px]">{children}</div>
      </main>
    </div>
  );
}