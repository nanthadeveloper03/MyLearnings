"use client";

import Sidebar from "@/app/dashboard/sideBar";
import Layout from "../layout/Layout";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebar"
            className={`col-md-2 col-lg-2 d-lg-block user-sidebar collapse ${
              isSidebarOpen ? "show" : ""
            }`}
          >
            <Sidebar />
          </nav>
          <main
            role="main"
            className="col-xl-10 ml-sm-auto col-lg-10 px-4 mt-2"
          >
            {children}
          </main>
        </div>
      </div>
    </Layout>
  );
}
