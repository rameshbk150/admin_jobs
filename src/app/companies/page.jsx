"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Plus,
  Search,
  RefreshCw,
} from "lucide-react";

import CompanyTable from "@/components/CompanyTable";

const API_URL = "/api";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/companies`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to fetch companies."
        );
      }

      setCompanies(
        Array.isArray(data.companies)
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
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return companies;
      }

      return companies.filter(
        (company) =>
          company.name
            ?.toLowerCase()
            .includes(query) ||
          company.industry
            ?.toLowerCase()
            .includes(query) ||
          company.location
            ?.toLowerCase()
            .includes(query) ||
          company.company_type
            ?.toLowerCase()
            .includes(query)
      );
    }, [companies, search]);

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Company Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Companies
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage companies displayed on your
            job portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchCompanies}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <Link
            href="/companies/add"
            className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={18} />

            Add Company
          </Link>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Total Companies
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {companies.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Active Companies
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-600">
            {
              companies.filter(
                (company) =>
                  company.status ===
                    "active" ||
                  !company.status
              ).length
            }
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Search Results
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {filteredCompanies.length}
          </h2>
        </div>
      </div>

      {/* SEARCH */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search companies by name, industry or location..."
            className="h-11 w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="text-center">
            <RefreshCw
              size={28}
              className="mx-auto animate-spin text-blue-600"
            />

            <p className="mt-3 text-sm font-medium text-slate-500">
              Loading companies...
            </p>
          </div>
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        !error &&
        filteredCompanies.length ===
          0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              No companies found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add your first company or change
              your search.
            </p>

            <Link
              href="/companies/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              <Plus size={17} />
              Add Company
            </Link>
          </div>
        )}

      {/* TABLE */}

      {!loading &&
        !error &&
        filteredCompanies.length >
          0 && (
          <CompanyTable
            companies={
              filteredCompanies
            }
          />
        )}
    </div>
  );
}