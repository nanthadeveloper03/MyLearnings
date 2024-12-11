'use client'
import Link from "next/link";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import WithdrawTab from "@/components/sections/withdraw/WithdrawTab";


import { useState } from "react"
import './dashboard.css';
import './referral.css';
import './withdraw.css';
import ChatSupport from "@/components/sections/support/ChatSupport";
import '../support/support.css';

export default function Withdraw() {

  return (
    <>
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <WithdrawTab />
      </div>
    </DashboardLayout>
    
    <ChatSupport />
    </>
  );
}
