"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DoctorType } from "../Type/type";

type Status = DoctorType["status"];

const statusStyles: Record<Status, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  rejected: "bg-red-50 text-red-700 ring-red-600/20",
};

const statusLabel: Record<Status, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DocumentPreview = ({
  documents,
  name,
  onOpen,
}: {
  documents: string[];
  name: string;
  onOpen: (docs: string[], index: number) => void;
}) => {
  const docs = documents.slice(0, 2);

  if (docs.length === 0) {
    return <span className="text-xs text-zinc-400">No document</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {docs.map((doc, index) => (
        <button
          key={`${doc}-${index}`}
          type="button"
          onClick={() => onOpen(documents, index)}
          className="group relative size-11 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 ring-teal-600/30 transition hover:border-teal-500 hover:ring-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          aria-label={`Open document ${index + 1} for ${name}`}
          title="View document"
        >
          <Image
            src={doc}
            alt={`${name} document ${index + 1}`}
            fill
            sizes="44px"
            className="object-cover transition duration-200 group-hover:scale-105"
            unoptimized
          />
        </button>
      ))}
    </div>
  );
};

const DocumentModal = ({
  documents,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  documents: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  const hasMultiple = documents.length > 1;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-zinc-900/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Document preview"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-white p-3 shadow-2xl sm:p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="text-sm font-medium text-zinc-700">
            Document {index + 1}
            {hasMultiple ? <span className="text-zinc-400"> / {documents.length}</span> : null}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40"
            aria-label="Close document preview"
          >
            <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-zinc-100 sm:min-h-[480px]">
          {hasMultiple ? (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-2 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 sm:left-4"
              aria-label="Previous document"
            >
              <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          ) : null}

          <Image
            src={documents[index]}
            alt={`Credential document ${index + 1}`}
            width={1200}
            height={1500}
            className="max-h-[70vh] w-auto max-w-full object-contain"
            unoptimized
          />

          {hasMultiple ? (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-2 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 sm:right-4"
              aria-label="Next document"
            >
              <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const DoctorList = ({ doctors }: { doctors: DoctorType[] }) => {
  const [preview, setPreview] = useState<{ documents: string[]; index: number } | null>(null);

  const closePreview = () => setPreview(null);
  const openPreview = (documents: string[], index: number) => setPreview({ documents, index });
  const showPrev = () =>
    setPreview((current) => {
      if (!current || current.documents.length < 2) return current;
      return {
        ...current,
        index: (current.index - 1 + current.documents.length) % current.documents.length,
      };
    });
  const showNext = () =>
    setPreview((current) => {
      if (!current || current.documents.length < 2) return current;
      return {
        ...current,
        index: (current.index + 1) % current.documents.length,
      };
    });

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full divide-y divide-zinc-100">
            <thead className="bg-zinc-50/80">
              <tr className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                <th className="px-5 py-4">Doctor</th>
                <th className="px-5 py-4">BMDC</th>
                <th className="px-5 py-4">Specialization</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Documents</th>
                <th className="px-5 py-4">Applied</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 bg-white">
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="align-top transition-colors hover:bg-zinc-50/60">
                  <td className="px-5 py-4">
                    <div className="min-w-[220px]">
                      <p className="text-sm font-semibold text-zinc-900">{doctor.fullName}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">{doctor.medicalQualification}</p>
                      <p className="mt-1 text-xs text-zinc-500">{doctor.professionalPhoneNumber}</p>
                      <p className="mt-0.5 text-xs text-zinc-400">{doctor.currentHospitalAffiliation}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{doctor.bmdcRegistrationNumber}</td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{doctor.specialization}</td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{doctor.yearsOfExperience} yrs</td>
                  <td className="px-5 py-4">
                    <DocumentPreview documents={doctor.credentialDocuments || []} name={doctor.fullName} onOpen={openPreview} />
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-600">{formatDate(doctor.createAt)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[doctor.status]}`}>
                      {statusLabel[doctor.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <select
                        defaultValue={doctor.status}
                        aria-label={`Update status for ${doctor.fullName}`}
                        className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-zinc-100 lg:hidden">
          {doctors.map((doctor) => (
            <article key={doctor._id} className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900">{doctor.fullName}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{doctor.medicalQualification}</p>
                  <p className="mt-1 text-xs text-zinc-500">{doctor.currentHospitalAffiliation}</p>
                </div>
                <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[doctor.status]}`}>
                  {statusLabel[doctor.status]}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">BMDC</dt>
                  <dd className="mt-0.5 text-zinc-700">{doctor.bmdcRegistrationNumber}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Specialization</dt>
                  <dd className="mt-0.5 text-zinc-700">{doctor.specialization}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Experience</dt>
                  <dd className="mt-0.5 text-zinc-700">{doctor.yearsOfExperience} years</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Applied</dt>
                  <dd className="mt-0.5 text-zinc-700">{formatDate(doctor.createAt)}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Phone</dt>
                  <dd className="mt-0.5 text-zinc-700">{doctor.professionalPhoneNumber}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Documents</dt>
                  <dd>
                    <DocumentPreview documents={doctor.credentialDocuments || []} name={doctor.fullName} onOpen={openPreview} />
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400" htmlFor={`status-${doctor._id}`}>
                  Update status
                </label>
                <select
                  id={`status-${doctor._id}`}
                  defaultValue={doctor.status}
                  className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 sm:w-52"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
            </article>
          ))}
        </div>
      </div>

      {preview ? (
        <DocumentModal
          documents={preview.documents}
          index={preview.index}
          onClose={closePreview}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
    </>
  );
};

export default DoctorList;
