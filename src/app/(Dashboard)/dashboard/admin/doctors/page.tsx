import DoctorList from "@/app/Components/Admin/DoctorList";
import { DoctorType } from "@/app/Components/Type/type";

const doctorsData = async (): Promise<{
  success: boolean;
  data: DoctorType[];
}> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/doctors-applications`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return { success: false, data: [] };
  }

  return res.json();
};

export default async function DoctorsPage() {
  const { data: doctors = [] } = await doctorsData();
  const specializations = [
    "All Specializations",
    ...new Set(doctors.map((doctor) => doctor.specialization).filter(Boolean)),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">Administration</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Doctor Applications</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Review doctor registrations, verify credentials, and update application status.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-200/80 bg-white px-4 py-2.5 text-sm text-zinc-600 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <span className="font-semibold text-zinc-900">{doctors.length}</span>
          <span>Total applications</span>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative block">
            <span className="sr-only">Search doctors</span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
              <svg aria-hidden="true" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search by name, BMDC, or phone..."
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            />
          </label>

          <label className="block">
            <span className="sr-only">Filter by specialization</span>
            <select
              defaultValue="All Specializations"
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm text-zinc-700 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            >
              {specializations.map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <DoctorList doctors={doctors} />
    </div>
  );
}
