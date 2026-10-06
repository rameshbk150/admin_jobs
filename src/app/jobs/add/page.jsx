"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function AddJobPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      title: "",
      company_id: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      work_mode: "",
      category: "",
      experience: "",
      qualification: "",
      skills: "",
      description: "",
      responsibilities: "",
      openings: "1",
      posted_date: "",
      deadline: "",
      featured: false,
    });

  const [companies, setCompanies] =
    useState([]);

  const [
    companiesLoading,
    setCompaniesLoading,
  ] = useState(true);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* =========================================
     GET COMPANIES
  ========================================= */

  useEffect(() => {
    const fetchCompanies =
      async () => {
        try {
          setCompaniesLoading(
            true
          );

          setError("");

          const response =
            await fetch(
              `${API_URL}/companies`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data?.message ||
                "Unable to fetch companies."
            );
          }

          setCompanies(
            Array.isArray(
              data.companies
            )
              ? data.companies
              : []
          );
        } catch (error) {
          console.error(
            "Fetch companies error:",
            error
          );

          setError(
            error.message ||
              "Unable to load companies."
          );
        } finally {
          setCompaniesLoading(
            false
          );
        }
      };

    fetchCompanies();
  }, []);

  /* =========================================
     NORMAL INPUT
  ========================================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  };

  /* =========================================
     COMPANY SELECT
  ========================================= */

  const handleCompanyChange = (
    event
  ) => {
    const companyId =
      event.target.value;

    const selectedCompany =
      companies.find(
        (company) =>
          String(company.id) ===
          String(companyId)
      );

    setFormData(
      (previous) => ({
        ...previous,

        company_id:
          companyId,

        company:
          selectedCompany?.name ||
          "",
      })
    );
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!formData.title.trim()) {
        throw new Error(
          "Job title is required."
        );
      }

      if (
        !formData.company_id
      ) {
        throw new Error(
          "Please select a company."
        );
      }

      if (!formData.company) {
        throw new Error(
          "Invalid company selected."
        );
      }

      if (
        Number(
          formData.openings
        ) < 1
      ) {
        throw new Error(
          "Openings must be at least 1."
        );
      }

      if (
        formData.posted_date &&
        formData.deadline &&
        new Date(
          formData.deadline
        ) <
          new Date(
            formData.posted_date
          )
      ) {
        throw new Error(
          "Deadline cannot be before posted date."
        );
      }

      const payload = {
        title:
          formData.title.trim(),

        company_id:
          Number(
            formData.company_id
          ),

        company:
          formData.company.trim(),

        location:
          formData.location.trim(),

        salary:
          formData.salary.trim(),

        type:
          formData.type,

        work_mode:
          formData.work_mode,

        category:
          formData.category.trim(),

        experience:
          formData.experience.trim(),

        qualification:
          formData.qualification.trim(),

        skills:
          formData.skills
            ? formData.skills
                .split(",")
                .map((skill) =>
                  skill.trim()
                )
                .filter(Boolean)
            : [],

        description:
          formData.description.trim(),

        responsibilities:
          formData.responsibilities
            ? formData.responsibilities
                .split("\n")
                .map(
                  (
                    responsibility
                  ) =>
                    responsibility.trim()
                )
                .filter(Boolean)
            : [],

        openings:
          Number(
            formData.openings
          ) || 1,

        posted_date:
          formData.posted_date ||
          null,

        deadline:
          formData.deadline ||
          null,

        featured:
          Boolean(
            formData.featured
          ),

        status: "active",
      };

      console.log(
        "Creating job:",
        payload
      );

      const response =
        await fetch(
          `${API_URL}/jobs`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

      console.log(
        "Create Job API:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to create job."
        );
      }

      setSuccess(
        "Job posted successfully."
      );

      setTimeout(() => {
        router.push("/jobs");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error(
        "Add job error:",
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
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6">
        <Link
          href="/jobs"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft
            size={17}
          />

          Back to Jobs
        </Link>

        <p className="text-sm font-semibold text-blue-600">
          Job Management
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Post New Job
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new job
          opening for your job
          portal.
        </p>
      </div>

      {/* =====================================
          SUCCESS
      ===================================== */}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2
            size={20}
          />

          {success}
        </div>
      )}

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          <AlertCircle
            size={20}
          />

          {error}
        </div>
      )}

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >
        {/* =================================
            BASIC INFORMATION
        ================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the basic
              details of the job
              opening.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Job Title"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Frontend Developer"
              required
            />

            {/* COMPANY */}

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Company

                <span className="ml-1 text-red-500">
                  *
                </span>
              </span>

              <div className="relative">
                <Building2
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={
                    formData.company_id
                  }
                  onChange={
                    handleCompanyChange
                  }
                  disabled={
                    companiesLoading
                  }
                  required
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  <option value="">
                    {companiesLoading
                      ? "Loading companies..."
                      : "Select Company"}
                  </option>

                  {companies.map(
                    (company) => (
                      <option
                        key={
                          company.id
                        }
                        value={
                          company.id
                        }
                      >
                        {
                          company.name
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              {!companiesLoading &&
                companies.length ===
                  0 && (
                  <p className="mt-2 text-xs font-semibold text-red-500">
                    No companies
                    found in the
                    companies table.
                  </p>
                )}

              {formData.company && (
                <p className="mt-2 text-xs text-slate-500">
                  Selected:{" "}
                  <span className="font-bold text-slate-700">
                    {
                      formData.company
                    }
                  </span>
                  {" · ID: "}
                  {
                    formData.company_id
                  }
                </p>
              )}
            </label>

            <Input
              label="Location"
              name="location"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              placeholder="Mumbai, Maharashtra"
            />

            <Input
              label="Salary"
              name="salary"
              value={
                formData.salary
              }
              onChange={
                handleChange
              }
              placeholder="₹6-10 LPA"
            />

            <Select
              label="Job Type"
              name="type"
              value={
                formData.type
              }
              onChange={
                handleChange
              }
              options={[
                "Full Time",
                "Part Time",
                "Internship",
                "Contract",
                "Freelance",
              ]}
            />

            <Select
              label="Work Mode"
              name="work_mode"
              value={
                formData.work_mode
              }
              onChange={
                handleChange
              }
              options={[
                "Work from Office",
                "Remote",
                "Hybrid",
              ]}
            />

            <Input
              label="Category"
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              placeholder="Software Development"
            />

            <Input
              label="Experience"
              name="experience"
              value={
                formData.experience
              }
              onChange={
                handleChange
              }
              placeholder="1-3 Years"
            />

            <div className="md:col-span-2">
              <Input
                label="Qualification"
                name="qualification"
                value={
                  formData.qualification
                }
                onChange={
                  handleChange
                }
                placeholder="B.E / B.Tech / BCA / MCA"
              />
            </div>
          </div>
        </section>

        {/* =================================
            JOB DETAILS
        ================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Job Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add skills,
              description,
              responsibilities and
              application details.
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="Skills"
              name="skills"
              value={
                formData.skills
              }
              onChange={
                handleChange
              }
              placeholder="React.js, Next.js, JavaScript, Tailwind CSS"
              helper="Separate skills using commas."
            />

            <Textarea
              label="Job Description"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Enter detailed job description..."
            />

            <Textarea
              label="Responsibilities"
              name="responsibilities"
              value={
                formData.responsibilities
              }
              onChange={
                handleChange
              }
              placeholder={`Develop responsive frontend interfaces
Integrate REST APIs
Maintain reusable components
Fix UI and performance issues`}
              helper="Write one responsibility per line."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Openings"
                name="openings"
                type="number"
                min="1"
                value={
                  formData.openings
                }
                onChange={
                  handleChange
                }
                placeholder="1"
              />

              <Input
                label="Posted Date"
                name="posted_date"
                type="date"
                value={
                  formData.posted_date
                }
                onChange={
                  handleChange
                }
              />

              <Input
                label="Deadline"
                name="deadline"
                type="date"
                value={
                  formData.deadline
                }
                onChange={
                  handleChange
                }
              />
            </div>

            {/* FEATURED */}

            <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50">
              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={
                  handleChange
                }
                className="h-4 w-4 accent-blue-600"
              />

              <div>
                <p className="text-sm font-bold text-slate-700">
                  Featured Job
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Show this job in
                  featured job
                  sections.
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* =================================
            ACTIONS
        ================================= */}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            href="/jobs"
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={
              loading ||
              companiesLoading ||
              companies.length ===
                0
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {loading
              ? "Saving Job..."
              : "Save Job"}
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
  type = "text",
  placeholder = "",
  required = false,
  helper = "",
  min,
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
        onChange={onChange}
        required={required}
        placeholder={
          placeholder
        }
        min={min}
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
   SELECT
========================================= */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        <option value="">
          Select {label}
        </option>

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
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
  helper = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <textarea
        rows="5"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={
          placeholder
        }
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      />

      {helper && (
        <span className="mt-1.5 block text-xs text-slate-400">
          {helper}
        </span>
      )}
    </label>
  );
}