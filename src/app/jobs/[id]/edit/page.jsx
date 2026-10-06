"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Save,
} from "lucide-react";

export default function EditJobPage({
  params,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Frontend only: Job updated."
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/jobs"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft size={17} />
        Back to Jobs
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Job
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update job information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Job Title"
            defaultValue="Frontend Developer"
          />

          <Input
            label="Company"
            defaultValue="Tech Solutions"
          />

          <Input
            label="Location"
            defaultValue="Mumbai, Maharashtra"
          />

          <Input
            label="Salary"
            defaultValue="₹6-10 LPA"
          />

          <Input
            label="Job Type"
            defaultValue="Full Time"
          />

          <Input
            label="Experience"
            defaultValue="1-3 Years"
          />
        </div>

        <div className="mt-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Description
            </span>

            <textarea
              rows="6"
              defaultValue="Develop responsive and high-performance web applications."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
          >
            <Save size={17} />
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  defaultValue,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        type="text"
        defaultValue={defaultValue}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
      />
    </label>
  );
}