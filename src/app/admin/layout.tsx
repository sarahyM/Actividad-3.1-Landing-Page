import type React from "react";
import { AdminNav } from "@/components/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="pt-16">{children}</div>
    </div>
  );
}
