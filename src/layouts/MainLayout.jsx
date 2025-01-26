import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const pathArr = location.pathname.split("/").filter((_) => _);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <main className="flex flex-col grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
