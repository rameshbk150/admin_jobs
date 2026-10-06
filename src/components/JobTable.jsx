import Link from "next/link";

import {
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

export default function JobTable({
  jobs,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                Job Title
              </th>

              <th className="px-5 py-4">
                Company
              </th>

              <th className="px-5 py-4">
                Location
              </th>

              <th className="px-5 py-4">
                Type
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {job.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {job.salary}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {job.company}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {job.location}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {job.type}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    Active
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
                    >
                      <Eye size={16} />
                    </button>

                    <Link
                      href={`/jobs/${job.id}/edit`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                    </Link>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}