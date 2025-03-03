import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Services
import authService from "@/api/services/authService";

// Redux
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/features/userSlice";

// Components
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import DotsLoader from "@/components/DotsLoader";
import MainLayoutTabs from "@/components/MainLayoutTabs";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadUserData = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const user = await authService.getUserProfile();

        if (!["owner", "admin"].includes(user?.status)) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          throw new Error("Unauthorized");
        }

        dispatch(updateUser(user));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <DotsLoader color="#0085FF" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          title="Reload"
          aria-label="Reload"
          onClick={() => window.location.reload()}
          className="flex items-center justify-center size-10"
        >
          <Icon src={reloadIcon} alt="Reload icon" />
        </button>
      </div>
    );
  }

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
