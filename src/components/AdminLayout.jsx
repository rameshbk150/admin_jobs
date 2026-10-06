"use client";

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-[270px]">
        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}