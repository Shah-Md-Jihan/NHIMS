"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface LocalFile {
  file: File;
  previewUrl: string;
}

const Field = ({
  label,
  id,
  type = "text",
  placeholder,
  required = true,
  disabled = false,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-[13px] font-medium text-zinc-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 disabled:cursor-not-allowed disabled:bg-zinc-100"
    />
  </div>
);

export default function DoctorApplicationPage() {
  const [selectedFiles, setSelectedFiles] = useState<LocalFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const { data: session } = useSession();
  const route = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileError(null);

    if (files && files.length > 0) {
      const newFiles: LocalFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "image/jpeg" || file.type === "image/png") {
          newFiles.push({
            file,
            previewUrl: URL.createObjectURL(file),
          });
        } else {
          setFileError("Only JPG and PNG files are allowed.");
          return;
        }
      }

      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    URL.revokeObjectURL(selectedFiles[indexToRemove].previewUrl);

    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      setFileError(
        "ImgBB API key missing. Please check NEXT_PUBLIC_IMGBB_API_KEY in .env.local",
      );
      return;
    }

    if (selectedFiles.length === 0) {
      setFileError("Please upload at least one credential document.");
      return;
    }

    setIsSubmitting(true);
    setFileError(null);

    try {
      // 1. Collect form data safely using Form Element Target
      const rawFormData = new window.FormData(formElement);
      const doctorInfo = Object.fromEntries(rawFormData.entries());

      // File input-এর binary data বাদ দেওয়ার জন্য delete করা হচ্ছে
      delete doctorInfo.credentialDocument;

      // 2. Upload images to ImgBB
      const uploadedUrls: string[] = [];

      for (const item of selectedFiles) {
        const imgFormData = new window.FormData();
        imgFormData.append("image", item.file);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imgFormData,
            signal: controller.signal,
          },
        );
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`Upload failed with status: ${res.status}`);
        }

        const image = await res.json();
        if (image?.data?.url) {
          uploadedUrls.push(image.data.url);
        } else {
          throw new Error("Invalid response format from ImgBB");
        }
      }

      // 3. Construct final Payload
      const finalData = {
        ...doctorInfo,
        userId: session?.user?.id,
        credentialDocuments: uploadedUrls,
      };

      console.log("Submitting Final Data:", finalData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/doctor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit doctor application.");
      }

      const result = await res.json();

      if (result.success) {
        toast.success(result.message || "Application Done Successfully");

        // Reset form & cleanup image previews
        selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        setSelectedFiles([]);
        formElement.reset();

        route.refresh();
      } else {
        toast.error(result.message || "Failed to submit doctor application.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      if (error.name === "AbortError") {
        setFileError(
          "Upload timed out. Check your internet connection or AdBlocker.",
        );
      } else {
        setFileError(
          error.message || "Failed to upload images or submit form.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/profile"
          className="text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          &larr; Back to profile
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Doctor Registration
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Apply to join NHIMS as a verified healthcare professional.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="border-b border-zinc-100 px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Doctor Application Form
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Provide your professional details for Super Admin verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              id="fullName"
              placeholder="Dr. Sumon Ahmed"
              disabled={isSubmitting}
              required
            />
            <Field
              label="BMDC Registration Number"
              id="bmdcRegistrationNumber"
              placeholder="A-12345"
              disabled={isSubmitting}
              required
            />
            <Field
              label="Medical Qualification"
              id="medicalQualification"
              placeholder="MBBS, FCPS"
              disabled={isSubmitting}
              required
            />
            <Field
              label="Specialization"
              id="specialization"
              placeholder="Cardiology"
              disabled={isSubmitting}
              required
            />
            <Field
              label="Years of Experience"
              id="yearsOfExperience"
              type="number"
              placeholder="5"
              disabled={isSubmitting}
              required
            />
            <Field
              label="Professional Phone Number"
              id="professionalPhoneNumber"
              placeholder="+880 1712-345678"
              disabled={isSubmitting}
              required
            />
          </div>

          <Field
            label="Current Hospital Affiliation"
            id="currentHospitalAffiliation"
            placeholder="Dhaka Medical College Hospital"
            disabled={isSubmitting}
            required
          />

          <div className="space-y-1.5">
            <label
              htmlFor="credentialDocument"
              className="block text-[13px] font-medium text-zinc-700"
            >
              Credential Document Upload <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-zinc-600">
                <p className="font-medium text-zinc-800">
                  Upload credential documents
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  JPG or PNG only. Multiple files allowed. Max 2 MB each.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                Choose files
                <input
                  id="credentialDocument"
                  name="credentialDocument"
                  onChange={handleFileChange}
                  type="file"
                  accept="image/jpeg, image/png"
                  multiple
                  disabled={isSubmitting}
                  className="sr-only"
                />
              </label>
            </div>

            {fileError && (
              <p className="text-xs font-medium text-red-500">{fileError}</p>
            )}

            {selectedFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {selectedFiles.map((item, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100"
                  >
                    <Image
                      src={item.previewUrl}
                      alt={`Document ${index + 1}`}
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      disabled={isSubmitting}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900/70 text-white transition-opacity hover:bg-red-600 focus:outline-none"
                      title="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/profile"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
