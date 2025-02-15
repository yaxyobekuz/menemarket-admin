import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import Header from "@/components/Header";
import MainLayoutTabs from "@/components/MainLayoutTabs";

const MainLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!token) return (window.location.pathname = "/login");
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex flex-col grow py-14">
        <Outlet />
      </main>

      {/* Nav tabs */}
      <MainLayoutTabs />
    </div>
  );
};

export default MainLayout;
