import Link from "next/link";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-zinc-500">{label}</dt>
    <dd className="mt-1 text-sm text-zinc-900 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
          Account
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your personal information and account settings.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-2xl font-bold text-teal-700 ring-1 ring-teal-100 sm:size-24">
              S
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">Sumon Ahmed</h2>
                <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
                  Patient
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                sumon.ahmed@example.com
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                NHIMS Patient ID:{" "}
                <span className="font-medium text-zinc-700">
                  NHIMS-P-2026-00124
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Change Password
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] xl:col-span-2">
          <div className="border-b border-zinc-100 px-5 py-4 sm:px-6">
            <h2 className="text-base font-semibold text-zinc-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Your basic account and contact details.
            </p>
          </div>
          <dl className="divide-y divide-zinc-100 px-5 sm:px-6">
            <InfoRow label="Full name" value="Sumon Ahmed" />
            <InfoRow label="Email address" value="sumon.ahmed@example.com" />
            <InfoRow label="Phone number" value="+880 1712-345678" />
            <InfoRow label="Date of birth" value="12 March 1998" />
            <InfoRow label="Gender" value="Male" />
            <InfoRow label="Blood group" value="B+" />
            <InfoRow
              label="Address"
              value="House 12, Road 5, Dhanmondi, Dhaka"
            />
            <InfoRow
              label="Emergency contact"
              value="Ayesha Ahmed — +880 1812-000000"
            />
            <InfoRow label="Account created" value="26 November 2026" />
          </dl>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="border-b border-zinc-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-zinc-900">
                Quick Actions
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Access your health workspace.
              </p>
            </div>
            <div className="grid gap-2 p-4 sm:grid-cols-2 xl:grid-cols-1">
              <Link
                href="/dashboard/patient/records"
                className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                View Medical Records
              </Link>
              <Link
                href="/dashboard/patient/appointments"
                className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                View Appointments
              </Link>
              <Link
                href="/dashboard/patient/prescriptions"
                className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                View Prescriptions
              </Link>
              <Link
                href="/dashboard/patient/lab-reports"
                className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                View Diagnostic Reports
              </Link>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-zinc-200/80 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="bg-gradient-to-br from-teal-700 to-teal-600 p-5 text-white sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100">
                Healthcare Professional
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                Are you a Healthcare Professional?
              </h3>
              <p className="mt-2 text-sm text-teal-50/90">
                Join NHIMS as a verified doctor and help patients access better
                healthcare services.
              </p>
              <Link
                href="/dashboard/doctor-application"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-teal-800 hover:bg-teal-50"
              >
                Register as Doctor
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
