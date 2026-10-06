"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaTrash,
  FaUser,
  FaRotate,
} from "react-icons/fa6";

const API_URL = "/api";

export default function ApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================
     GET APPLICATIONS
  ===================================== */

  const fetchApplications =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/applications`,
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load applications."
          );
        }

        setApplications(
          data.applications || []
        );
      } catch (error) {
        console.error(
          "Applications Error:",
          error
        );

        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  /* =====================================
     UPDATE STATUS
  ===================================== */

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/applications/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to update status."
        );
      }

      setApplications(
        (previous) =>
          previous.map(
            (application) =>
              application.id === id
                ? {
                    ...application,
                    status,
                  }
                : application
          )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  /* =====================================
     DELETE
  ===================================== */

  const handleDelete = async (
    applicationId
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this application?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/applications/${applicationId}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to delete application."
        );
      }

      setApplications(
        (previous) =>
          previous.filter(
            (application) =>
              application.id !==
              applicationId
          )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  /* =====================================
     STATISTICS
  ===================================== */

  const total =
    applications.length;

  const pending =
    applications.filter(
      (application) =>
        application.status ===
        "Pending"
    ).length;

  const shortlisted =
    applications.filter(
      (application) =>
        application.status ===
        "Shortlisted"
    ).length;

  const hired =
    applications.filter(
      (application) =>
        application.status ===
        "Hired"
    ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              font-bold
              text-blue-600
            "
          >
            Recruitment
          </p>

          <h1
            className="
              mt-1
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
            "
          >
            Applications
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Review applications
            submitted by job seekers.
          </p>
        </div>

        <button
          type="button"
          onClick={
            fetchApplications
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-700
            shadow-sm
            transition
            hover:bg-slate-50
          "
        >
          <FaRotate />

          Refresh
        </button>
      </div>

      {/* STATS */}

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          label="Total Applications"
          value={total}
        />

        <StatCard
          label="Pending"
          value={pending}
        />

        <StatCard
          label="Shortlisted"
          value={shortlisted}
        />

        <StatCard
          label="Hired"
          value={hired}
        />
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            font-medium
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div className="overflow-x-auto">
          <table
            className="
              w-full
              min-w-[1200px]
            "
          >
            <thead className="bg-slate-50">
              <tr
                className="
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                <th className="px-5 py-4">
                  Candidate
                </th>

                <th className="px-5 py-4">
                  Contact
                </th>

                <th className="px-5 py-4">
                  Job
                </th>

                <th className="px-5 py-4">
                  Company
                </th>

                <th className="px-5 py-4">
                  Applied
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      px-5
                      py-14
                      text-center
                      text-sm
                      text-slate-500
                    "
                  >
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      px-5
                      py-16
                      text-center
                    "
                  >
                    <FaBriefcase
                      className="
                        mx-auto
                        mb-4
                        text-4xl
                        text-slate-300
                      "
                    />

                    <p
                      className="
                        text-lg
                        font-bold
                        text-slate-700
                      "
                    >
                      No applications
                      yet
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-400
                      "
                    >
                      When a user applies
                      for a job, the
                      application will
                      appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                applications.map(
                  (application) => (
                    <tr
                      key={
                        application.id
                      }
                      className="
                        border-t
                        border-slate-100
                        transition
                        hover:bg-slate-50/70
                      "
                    >
                      {/* CANDIDATE */}

                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-blue-50
                              text-blue-600
                            "
                          >
                            <FaUser />
                          </div>

                          <div>
                            <p
                              className="
                                font-bold
                                text-slate-800
                              "
                            >
                              {
                                application.candidate_name
                              }
                            </p>

                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-400
                              "
                            >
                              User #
                              {
                                application.user_id
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CONTACT */}

                      <td className="px-5 py-4">
                        <div className="space-y-1.5">
                          <p
                            className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-slate-600
                            "
                          >
                            <FaEnvelope className="text-slate-400" />

                            {
                              application.candidate_email
                            }
                          </p>

                          {application.phone && (
                            <p
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-500
                              "
                            >
                              <FaPhone className="text-slate-400" />

                              {
                                application.phone
                              }
                            </p>
                          )}

                          {application.location && (
                            <p
                              className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-slate-400
                              "
                            >
                              <FaLocationDot />

                              {
                                application.location
                              }
                            </p>
                          )}
                        </div>
                      </td>

                      {/* JOB */}

                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                        >
                          <FaBriefcase className="text-blue-500" />

                          {
                            application.job_title
                          }
                        </div>
                      </td>

                      {/* COMPANY */}

                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-600
                          "
                        >
                          <FaBuilding className="text-slate-400" />

                          {
                            application.company
                          }
                        </div>
                      </td>

                      {/* DATE */}

                      <td
                        className="
                          px-5
                          py-4
                          text-sm
                          text-slate-600
                        "
                      >
                        {new Date(
                          application.applied_at
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <select
                          value={
                            application.status
                          }
                          onChange={(
                            event
                          ) =>
                            handleStatusChange(
                              application.id,
                              event.target
                                .value
                            )
                          }
                          className="
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-slate-700
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-100
                          "
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Reviewed">
                            Reviewed
                          </option>

                          <option value="Shortlisted">
                            Shortlisted
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                          <option value="Hired">
                            Hired
                          </option>
                        </select>
                      </td>

                      {/* DELETE */}

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              application.id
                            )
                          }
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-50
                            text-red-600
                            transition
                            hover:bg-red-100
                          "
                          title="Delete application"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-3xl
          font-extrabold
          text-slate-900
        "
      >
        {value}
      </p>
    </div>
  );
}