"use client";

import Link from "next/link";
import {
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

export default function CompanyTable({
  companies,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                Company
              </th>

              <th className="px-5 py-4">
                Industry
              </th>

              <th className="px-5 py-4">
                Location
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4">
                Founded
              </th>

              <th className="px-5 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                {/* COMPANY */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-slate-500">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building2 size={19} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {company.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {company.company_type ||
                          "Company"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* INDUSTRY */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {company.industry || "-"}
                </td>

                {/* LOCATION */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {company.location || "-"}
                </td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-bold
                      ${
                        company.status ===
                        "inactive"
                          ? "bg-red-50 text-red-600"
                          : "bg-emerald-50 text-emerald-600"
                      }
                    `}
                  >
                    {company.status ||
                      "active"}
                  </span>
                </td>

                {/* FOUNDED */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {company.founded || "-"}
                </td>

                {/* ACTIONS */}

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/companies/${company.id}/edit`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-600 transition hover:bg-blue-50"
                      title="Edit Company"
                    >
                      <Pencil size={16} />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete?.(
                          company.id,
                          company.name
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                      title="Delete Company"
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