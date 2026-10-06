"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = "/api";

export default function AddCompanyPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    headquarters: "",
    employees: "",
    founded: "",
    company_type: "",
    website: "",
    logo: "",
    description: "",
    about: "",
    specialties: "",
    benefits: "",
    work_culture: "",
    open_roles: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* ============================
     HANDLE INPUT
  ============================ */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ============================
     SUBMIT COMPANY
  ============================ */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!formData.name.trim()) {
        throw new Error(
          "Company name is required."
        );
      }

      const token =
        localStorage.getItem(
          "adminToken"
        );

      const requestData = {
        name: formData.name.trim(),

        industry:
          formData.industry.trim(),

        location:
          formData.location.trim(),

        headquarters:
          formData.headquarters.trim(),

        employees:
          formData.employees.trim(),

        founded:
          formData.founded.trim(),

        company_type:
          formData.company_type.trim(),

        website:
          formData.website.trim(),

        logo:
          formData.logo.trim(),

        description:
          formData.description.trim(),

        about:
          formData.about.trim(),

        specialties:
          formData.specialties
            ? formData.specialties
                .split(",")
                .map((item) =>
                  item.trim()
                )
                .filter(Boolean)
            : [],

        benefits:
          formData.benefits
            ? formData.benefits
                .split(",")
                .map((item) =>
                  item.trim()
                )
                .filter(Boolean)
            : [],

        work_culture:
          formData.work_culture.trim(),

        open_roles:
          formData.open_roles
            ? formData.open_roles
                .split(",")
                .map((item) =>
                  item.trim()
                )
                .filter(Boolean)
            : [],

        status: "active",
      };

      const headers = {
        "Content-Type":
          "application/json",
      };

      /*
        If admin authentication is enabled,
        send JWT token.
      */

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_URL}/companies`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(
            requestData
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to add company."
        );
      }

      setSuccess(
        "Company added successfully."
      );

      /* CLEAR FORM */

      setFormData({
        name: "",
        industry: "",
        location: "",
        headquarters: "",
        employees: "",
        founded: "",
        company_type: "",
        website: "",
        logo: "",
        description: "",
        about: "",
        specialties: "",
        benefits: "",
        work_culture: "",
        open_roles: "",
      });

      /*
        Redirect to company list
        after successful save.
      */

      setTimeout(() => {
        router.push("/companies");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(
        "Add company error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">

      {/* BACK */}

      <Link
        href="/companies"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={17} />

        Back to Companies
      </Link>

      {/* HEADER */}

      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">
          Company Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Add Company
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Add a new company to JobFinder.
        </p>
      </div>

      {/* SUCCESS */}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={20} />

          {success}
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          <AlertCircle size={20} />

          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* COMPANY INFORMATION */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Company Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter basic company
              information.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Google"
              required
            />

            <Input
              label="Industry"
              name="industry"
              value={
                formData.industry
              }
              onChange={handleChange}
              placeholder="Technology"
            />

            <Input
              label="Location"
              name="location"
              value={
                formData.location
              }
              onChange={handleChange}
              placeholder="Bangalore, India"
            />

            <Input
              label="Headquarters"
              name="headquarters"
              value={
                formData.headquarters
              }
              onChange={handleChange}
              placeholder="Mountain View, USA"
            />

            <Input
              label="Employees"
              name="employees"
              value={
                formData.employees
              }
              onChange={handleChange}
              placeholder="100,000+"
            />

            <Input
              label="Founded"
              name="founded"
              value={
                formData.founded
              }
              onChange={handleChange}
              placeholder="1998"
            />

            <Input
              label="Company Type"
              name="company_type"
              value={
                formData.company_type
              }
              onChange={handleChange}
              placeholder="Public Company"
            />

            <Input
              label="Website"
              name="website"
              type="url"
              value={
                formData.website
              }
              onChange={handleChange}
              placeholder="https://company.com"
            />

            <div className="md:col-span-2">
              <Input
                label="Logo URL"
                name="logo"
                value={
                  formData.logo
                }
                onChange={handleChange}
                placeholder="/logo/company.jpg"
              />
            </div>

          </div>
        </section>

        {/* DESCRIPTION */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Company Details
          </h2>

          <div className="space-y-5">

            <Textarea
              label="Description"
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Short company description..."
            />

            <Textarea
              label="About Company"
              name="about"
              value={
                formData.about
              }
              onChange={handleChange}
              placeholder="Detailed company information..."
            />

            <Input
              label="Specialties"
              name="specialties"
              value={
                formData.specialties
              }
              onChange={handleChange}
              placeholder="Cloud Computing, AI, Software Development"
              helper="Separate multiple specialties using commas."
            />

            <Input
              label="Benefits"
              name="benefits"
              value={
                formData.benefits
              }
              onChange={handleChange}
              placeholder="Health benefits, Learning programs, Flexible work"
              helper="Separate multiple benefits using commas."
            />

            <Textarea
              label="Work Culture"
              name="work_culture"
              value={
                formData.work_culture
              }
              onChange={handleChange}
              placeholder="Describe company culture..."
            />

            <Input
              label="Open Roles"
              name="open_roles"
              value={
                formData.open_roles
              }
              onChange={handleChange}
              placeholder="Frontend Developer, Backend Developer, Designer"
              helper="Separate multiple roles using commas."
            />

          </div>
        </section>

        {/* BUTTONS */}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

          <Link
            href="/companies"
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />

            {loading
              ? "Saving Company..."
              : "Save Company"}
          </button>

        </div>

      </form>
    </div>
  );
}

/* =========================================
   INPUT
========================================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  helper,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      />

      {helper && (
        <span className="mt-1.5 block text-xs text-slate-400">
          {helper}
        </span>
      )}

    </label>
  );
}

/* =========================================
   TEXTAREA
========================================= */

function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <textarea
        rows={5}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      />

    </label>
  );
}