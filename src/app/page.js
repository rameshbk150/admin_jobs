import Link from "next/link";

import {
  BriefcaseBusiness,
  Building2,
  Users,
  FileUser,
  Plus,
  ArrowUpRight,
  Eye,
} from "lucide-react";

import StatCard from "@/components/StatCard";

const recentJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Mumbai",
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudSoft",
    location: "Pune",
    status: "Active",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "NextGen Technologies",
    location: "Bengaluru",
    status: "Active",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Pixel Studio",
    location: "Mumbai",
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-1 text-sm font-semibold text-blue-600">
            Overview
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage jobs, companies, users and
            applications.
          </p>
        </div>

        <Link
          href="/jobs/add"
          className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Post New Job
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Jobs"
          value="15"
          description="Jobs currently available"
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Companies"
          value="20"
          description="Companies listed"
          icon={Building2}
          iconClass="bg-violet-50 text-violet-600"
        />

        <StatCard
          title="Total Users"
          value="128"
          description="Registered job seekers"
          icon={Users}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Applications"
          value="346"
          description="Applications submitted"
          icon={FileUser}
          iconClass="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
            <div>
              <h2 className="font-bold text-slate-900">
                Recent Jobs
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest jobs posted on the portal
              </p>
            </div>

            <Link
              href="/jobs"
              className="flex items-center gap-1 text-sm font-bold text-blue-600"
            >
              View all
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">
                    Job
                  </th>

                  <th className="px-5 py-3">
                    Company
                  </th>

                  <th className="px-5 py-3">
                    Location
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-800">
                        {job.title}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {job.company}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {job.location}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        {job.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/jobs/${job.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Common admin actions
          </p>

          <div className="mt-5 space-y-3">
            <Link
              href="/jobs/add"
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <BriefcaseBusiness
                    size={18}
                  />
                </div>

                <span className="text-sm font-bold text-slate-700">
                  Post New Job
                </span>
              </div>

              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/companies/add"
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-violet-200 hover:bg-violet-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                  <Building2 size={18} />
                </div>

                <span className="text-sm font-bold text-slate-700">
                  Add Company
                </span>
              </div>

              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/users"
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <Users size={18} />
                </div>

                <span className="text-sm font-bold text-slate-700">
                  View Users
                </span>
              </div>

              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}