import {
  Search,
  UserRound,
  Eye,
  Ban,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    location: "Mumbai",
    joined: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Amit Patil",
    email: "amit@example.com",
    location: "Pune",
    joined: "11 Aug 2026",
  },
  {
    id: 3,
    name: "Sneha Shah",
    email: "sneha@example.com",
    location: "Thane",
    joined: "10 Aug 2026",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-blue-600">
          User Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Users
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage registered job seekers.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            placeholder="Search users..."
            className="h-11 w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-bold uppercase text-slate-500">
                <th className="px-5 py-4">
                  User
                </th>

                <th className="px-5 py-4">
                  Location
                </th>

                <th className="px-5 py-4">
                  Joined
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <UserRound size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {user.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {user.location}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {user.joined}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      Active
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
                        <Eye size={16} />
                      </button>

                      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500">
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}