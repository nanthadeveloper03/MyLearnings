'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import security from "./security.css";
import Link from "next/link";
import SecurityInn from "@/components/sections/security/SecurityInn";

export default function Security() {

  return (
    <DashboardLayout>

      <SecurityInn />

    </DashboardLayout>
  );

}
