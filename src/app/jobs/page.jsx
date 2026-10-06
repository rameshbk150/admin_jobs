"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  BriefcaseBusiness,
  Plus,
  Search,
  Pencil,
  Trash2,
  MapPin,
  Building2,
  IndianRupee,
  CalendarDays,
  RefreshCw,
  AlertCircle,
  Star,
} from "lucide-react";

const API_URL = "/api";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState(null);

  /* =========================================
     FETCH JOBS
  ========================================= */

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/jobs`,
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
            "Unable to fetch jobs."
        );
      }

      setJobs(
        Array.isArray(data.jobs)
          ? data.jobs
          : []
      );
    } catch (error) {
      console.error(
        "Fetch jobs error:",
        error
      );

      setError(
        error.message ||
          "Unable to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* =========================================
     FILTER
  ========================================= */

  const filteredJobs =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword) {
        return jobs;
      }

      return jobs.filter(
        (job) =>
          job.title
            ?.toLowerCase()
            .includes(keyword) ||
          job.company
            ?.toLowerCase()
            .includes(keyword) ||
          job.location
            ?.toLowerCase()
            .includes(keyword) ||
          job.category
            ?.toLowerCase()
            .includes(keyword) ||
          job.type
            ?.toLowerCase()
            .includes(keyword)
      );
    }, [jobs, search]);

  /* =========================================
     DELETE JOB
  ========================================= */

  const handleDelete = async (
    id,
    title
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `${API_URL}/jobs/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to delete job."
        );
      }

      setJobs((previous) =>
        previous.filter(
          (job) => job.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete job error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete job."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Job Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Jobs
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, manage and update
            job openings.
          </p>
        </div>

        <Link
          href="/jobs/add"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Post New Job
        </Link>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          <AlertCircle size={20} />

          {error}
        </div>
      )}

      {/* =====================================
          TOP BAR
      ===================================== */}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by job title, company, location or category..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <button
            type="button"
            onClick={fetchJobs}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCw size={17} />

            Refresh
          </button>
        </div>
      </div>

      {/* =====================================
          COUNT
      ===================================== */}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-bold text-slate-800">
            {
              filteredJobs.length
            }
          </span>{" "}
          jobs
        </p>
      </div>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <RefreshCw
            size={28}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading jobs...
          </p>
        </div>
      )}

      {/* =====================================
          EMPTY
      ===================================== */}

      {!loading &&
        filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BriefcaseBusiness
                size={26}
              />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No jobs found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create your first job
              posting.
            </p>

            <Link
              href="/jobs/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <Plus size={17} />

              Post New Job
            </Link>
          </div>
        )}

      {/* =====================================
          JOBS
      ===================================== */}

      {!loading &&
        filteredJobs.length > 0 && (
          <div className="grid gap-4">
            {filteredJobs.map(
              (job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md md:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                          {
                            job.title
                          }
                        </h2>

                        {Boolean(
                          job.featured
                        ) && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
                            <Star
                              size={
                                12
                              }
                            />

                            Featured
                          </span>
                        )}

                        <StatusBadge
                          status={
                            job.status
                          }
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2
                            size={
                              16
                            }
                          />

                          {
                            job.company
                          }
                        </span>

                        {job.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin
                              size={
                                16
                              }
                            />

                            {
                              job.location
                            }
                          </span>
                        )}

                        {job.salary && (
                          <span className="inline-flex items-center gap-1.5">
                            <IndianRupee
                              size={
                                16
                              }
                            />

                            {
                              job.salary
                            }
                          </span>
                        )}

                        {job.posted_date && (
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays
                              size={
                                16
                              }
                            />

                            {formatDate(
                              job.posted_date
                            )}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.type && (
                          <Tag>
                            {
                              job.type
                            }
                          </Tag>
                        )}

                        {job.work_mode && (
                          <Tag>
                            {
                              job.work_mode
                            }
                          </Tag>
                        )}

                        {job.category && (
                          <Tag>
                            {
                              job.category
                            }
                          </Tag>
                        )}

                        {job.experience && (
                          <Tag>
                            {
                              job.experience
                            }
                          </Tag>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Link
                        href={`/jobs/${job.id}/edit`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil
                          size={16}
                        />

                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            job.id,
                            job.title
                          )
                        }
                        disabled={
                          deletingId ===
                          job.id
                        }
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2
                          size={16}
                        />

                        {deletingId ===
                        job.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
    </div>
  );
}

/* =========================================
   STATUS
========================================= */

function StatusBadge({
  status = "active",
}) {
  const current =
    String(status).toLowerCase();

  if (current === "active") {
    return (
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold capitalize text-emerald-600">
        Active
      </span>
    );
  }

  if (current === "expired") {
    return (
      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold capitalize text-orange-600">
        Expired
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold capitalize text-slate-600">
      {status || "Inactive"}
    </span>
  );
}

/* =========================================
   TAG
========================================= */

function Tag({ children }) {
  return (
    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
      {children}
    </span>
  );
}

/* =========================================
   DATE
========================================= */

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}