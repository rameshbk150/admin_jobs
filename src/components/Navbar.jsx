"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Bell,
  Menu,
  Search,
  UserRound,
  ChevronDown,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";

const API_URL = "/api";

export default function Navbar({
  onMenuClick,
}) {
  const router =
    useRouter();

  const menuRef =
    useRef(null);

  const [admin, setAdmin] =
    useState(null);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  /* LOAD ADMIN */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "adminUser"
        );

      if (saved) {
        setAdmin(
          JSON.parse(saved)
        );
      }
    } catch {
      setAdmin(null);
    }
  }, []);

  /* OUTSIDE CLICK */

  useEffect(() => {
    const close = (
      event
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(
          false
        );
      }
    };

    document.addEventListener(
      "mousedown",
      close
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        close
      );
  }, []);

  /* LOGOUT */

  const handleLogout =
    async () => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      try {
        if (token) {
          await fetch(
            `${API_URL}/auth/admin/logout`,
            {
              method:
                "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
        }
      } catch (
        error
      ) {
        console.error(
          "Logout error:",
          error
        );
      } finally {
        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminUser"
        );

        setAdmin(null);

        setProfileOpen(
          false
        );

        router.replace(
          "/login"
        );

        router.refresh();
      }
    };

  const getInitial =
    () => {
      return (
        admin?.name
          ?.charAt(0)
          .toUpperCase() ||
        "A"
      );
    };

  const roleLabel =
    admin?.role ===
    "super_admin"
      ? "Super Admin"
      : "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={
            onMenuClick
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          <Menu
            size={21}
          />
        </button>

        <div>
          <h1 className="text-base font-bold text-slate-900 md:text-lg">
            Administration
          </h1>

          <div className="hidden items-center gap-1.5 sm:flex">
            <ShieldCheck
              size={12}
              className="text-emerald-500"
            />

            <p className="text-xs text-slate-500">
              Secure Admin
              Session
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 md:flex">
          <Search
            size={17}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search admin panel..."
            className="w-52 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
        >
          <Bell
            size={19}
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div
          ref={menuRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (value) =>
                  !value
              )
            }
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50 md:px-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              {admin?.name ? (
                getInitial()
              ) : (
                <UserRound
                  size={18}
                />
              )}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-[130px] truncate text-sm font-bold text-slate-800">
                {admin?.name ||
                  "Admin"}
              </p>

              <div className="flex items-center gap-1">
                <ShieldCheck
                  size={11}
                  className="text-emerald-500"
                />

                <p className="text-[11px] text-slate-500">
                  {
                    roleLabel
                  }
                </p>
              </div>
            </div>

            <ChevronDown
              size={15}
              className={`hidden transition sm:block ${
                profileOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {getInitial()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {admin?.name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {
                        admin?.email
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck
                    size={15}
                  />

                  OTP Verified
                  Session
                </div>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(
                      false
                    );

                    router.push(
                      "/settings"
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Settings
                    size={17}
                  />

                  Settings
                </button>

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  <LogOut
                    size={17}
                  />

                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}