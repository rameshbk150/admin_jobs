"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  LockKeyhole,
  Mail,
  LogIn,
  BriefcaseBusiness,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function LoginPage() {
  const router =
    useRouter();

  const [step, setStep] =
    useState("login");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [otp, setOtp] =
    useState("");

  const [
    adminId,
    setAdminId,
  ] = useState(null);

  const [
    maskedEmail,
    setMaskedEmail,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [error, setError] =
    useState("");

  /* =========================================
     EMAIL + PASSWORD
  ========================================= */

  const handleLogin =
    async (event) => {
      event.preventDefault();

      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/auth/admin/login`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  email:
                    email
                      .trim()
                      .toLowerCase(),

                  password,
                }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data?.message ||
              "Unable to login."
          );
        }

        setAdminId(
          data.adminId
        );

        setMaskedEmail(
          data.email ||
            email
        );

        setOtp("");

        setStep("otp");
      } catch (error) {
        setError(
          error.message ||
            "Login failed."
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================================
     VERIFY OTP
  ========================================= */

  const handleVerifyOtp =
    async (event) => {
      event.preventDefault();

      try {
        setLoading(true);
        setError("");

        if (
          otp.length !== 6
        ) {
          throw new Error(
            "Enter the 6-digit OTP."
          );
        }

        const response =
          await fetch(
            `${API_URL}/auth/admin/verify-otp`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  adminId,
                  otp,
                }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data?.message ||
              "Unable to verify OTP."
          );
        }

        localStorage.setItem(
          "adminToken",
          data.token
        );

        localStorage.setItem(
          "adminUser",
          JSON.stringify(
            data.admin
          )
        );

        router.replace("/");

        router.refresh();
      } catch (error) {
        setError(
          error.message ||
            "OTP verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================================
     BACK
  ========================================= */

  const backToLogin = () => {
    setStep("login");

    setOtp("");

    setAdminId(null);

    setError("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      {/* BACKGROUND */}

      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-28 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* BRAND */}

        <div className="mb-7 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <BriefcaseBusiness
              size={30}
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">
            JobFinder Admin
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Secure administration
            portal
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl md:p-8">
          {/* LOGIN */}

          {step === "login" && (
            <>
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter your admin
                  email and password
                  to continue.
                </p>
              </div>

              {error && (
                <ErrorBox
                  message={
                    error
                  }
                />
              )}

              <form
                onSubmit={
                  handleLogin
                }
                className="space-y-5"
              >
                <FieldLabel
                  label="Email Address"
                >
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={
                      email
                    }
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event
                          .target
                          .value
                      )
                    }
                    required
                    autoComplete="email"
                    placeholder="admin@jobfinder.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </FieldLabel>

                <FieldLabel
                  label="Password"
                >
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    value={
                      password
                    }
                    onChange={(
                      event
                    ) =>
                      setPassword(
                        event
                          .target
                          .value
                      )
                    }
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </FieldLabel>

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogIn
                    size={18}
                  />

                  {loading
                    ? "Checking..."
                    : "Continue"}
                </button>
              </form>
            </>
          )}

          {/* OTP */}

          {step === "otp" && (
            <>
              <button
                type="button"
                onClick={
                  backToLogin
                }
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
              >
                <ArrowLeft
                  size={16}
                />

                Back
              </button>

              <div className="mb-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck
                    size={28}
                  />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  Verify OTP
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  We sent a
                  6-digit OTP to
                </p>

                <p className="text-sm font-bold text-slate-800">
                  {maskedEmail}
                </p>
              </div>

              {error && (
                <ErrorBox
                  message={
                    error
                  }
                />
              )}

              <form
                onSubmit={
                  handleVerifyOtp
                }
              >
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Enter OTP
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(
                      event
                    ) => {
                      const value =
                        event
                          .target
                          .value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(
                            0,
                            6
                          );

                      setOtp(
                        value
                      );
                    }}
                    autoFocus
                    placeholder="000000"
                    className="h-16 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-2xl font-bold tracking-[12px] text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </label>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    otp.length !==
                      6
                  }
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShieldCheck
                    size={18}
                  />

                  {loading
                    ? "Verifying..."
                    : "Verify & Login"}
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  OTP expires in
                  5 minutes.
                </p>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          JobFinder secure admin
          authentication
        </p>
      </div>
    </main>
  );
}

function FieldLabel({
  label,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <div className="relative">
        {children}
      </div>
    </label>
  );
}

function ErrorBox({
  message,
}) {
  return (
    <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
      <AlertCircle
        size={18}
        className="mt-0.5 shrink-0"
      />

      {message}
    </div>
  );
}