"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Building2,
  Users,
  FileUser,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Companies",
    href: "/companies",
    icon: Building2,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: FileUser,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  open,
  onClose,
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[270px]
          flex-col
          border-r
          border-slate-200
          bg-white
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-slate-200 px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              J
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">
                JobFinder
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Admin Panel
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Menu
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(
                    item.href
                  );

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={19} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}