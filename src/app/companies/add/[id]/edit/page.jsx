"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Save,
} from "lucide-react";

export default function EditCompanyPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Frontend only: Company updated");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/companies"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <ArrowLeft size={17} />
        Back to Companies
      </Link>

      <h1 className="text-3xl font-bold text-slate-900">
        Edit Company
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        Update company information.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Company Name"
            defaultValue="Google"
          />

          <Input
            label="Industry"
            defaultValue="Technology"
          />

          <Input
            label="Location"
            defaultValue="Bangalore, India"
          />

          <Input
            label="Company Type"
            defaultValue="Public Company"
          />

          <Input
            label="Website"
            defaultValue="https://google.com"
          />

          <Input
            label="Employees"
            defaultValue="100,000+"
          />
        </div>

        <div className="mt-5">
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Description
            </span>

            <textarea
              rows="6"
              defaultValue="Google builds products and services used worldwide."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white">
            <Save size={17} />
            Update Company
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
        defaultValue={defaultValue}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none"
      />
    </label>
  );
}