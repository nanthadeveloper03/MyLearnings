"use client";
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from "@/app/dashboard/sideBar";
import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {

  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isMaintenance } = useSelector((state) => state.block);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (pathname && pathname != '/maintenance') {
      if (isMaintenance) {
        router.push('/maintenance');
      }
    }
  }, [pathname])

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebar"
            className={`col-md-2 col-lg-2 d-lg-block user-sidebar collapse ${isSidebarOpen ? "show" : ""
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
