import "./globals.css";

import AdminLayout from "@/components/AdminLayout";

export const metadata = {
  title: "JobFinder Admin",
  description:
    "JobFinder Administration Panel",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}