"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

const API_URL = "/api";

export default function AuthGuard({
  children,
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (
        pathname === "/login"
      ) {
        setChecking(false);
        return;
      }

      const token =
        localStorage.getItem(
          "adminToken"
        );

      if (!token) {
        router.replace(
          "/login"
        );

        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/auth/admin/me`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unauthorized"
          );
        }

        setChecking(false);
      } catch {
        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminUser"
        );

        router.replace(
          "/login"
        );
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (
    pathname === "/login"
  ) {
    return children;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  return children;
}