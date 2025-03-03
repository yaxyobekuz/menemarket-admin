import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Data
import roles from "@/data/roles";
import avatars from "@/data/avatars";

// Toaster (For notification)
import { notification } from "../notification";

// Components
import Tabs from "@/components/Tabs";
import Icon from "../components/Icon";
import DotsLoader from "@/components/DotsLoader";

// Services
import authService from "@/api/services/authService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/features/userSlice";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.data);

  const loadUserData = () => {
    setHasError(false);
    setIsLoading(true);

    // Fetch data
    authService
      .getUserProfile()
      .then((data) => dispatch(updateUser(data)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    notification.promise(
      authService.logout().then(() => {
        navigate("/login");
        localStorage.removeItem("token");
      }),
      {
        success: "Akkuntdan chiqildi",
        loading: "Akkauntdan chiqilmoqda",
        error: "Akkauntdan chiqishda xatolik",
      }
    );
  };

  useEffect(() => {
    if (!user) loadUserData();
    else setTimeout(() => setIsLoading(false), 500);
  }, []);

  const { avatar, name: firstName, username, status: role } = user || {};
  const isValidAvatarUrl = String(avatar?.original)?.startsWith("https");
  const formattedRole =
    roles.find(({ value }) => value == role?.toLowerCase())?.name ||
    role ||
    "Mavjud emas";

  return (
    <div className="py-6">
      <div className="container space-y-7">
        <h1>Profil</h1>

        {/* Nav tabs */}
        <Tabs name="profile" />

        {/* User info */}
        <div className="flex items-start gap-5">
          <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl w-full xs:p-5 sm:gap-5">
            {/* Content */}
            {!isLoading && !hasError && (
              <>
                <Icon
                  size={128}
                  alt="User avatar"
                  src={isValidAvatarUrl ? avatar?.original : avatars["default"][2]}
                  className="size-12 bg-gray-light rounded-full xs:size-14 sm:size-20 md:size-32"
                />

                <div className="space-y-1 sm:space-y-3.5">
                  {/* First name */}
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3.5">
                    <b className="text-lg font-semibold text-center sm:text-xl md:text-2xl">
                      {firstName}
                    </b>

                    <span className="inline-block size-1.5 bg-neutral-300 rounded-full" />

                    {/* Role */}
                    <span className="text-base text-green-500 sm:text-lg">
                      {formattedRole}
                    </span>
                  </div>

                  {/* Username */}
                  <p className="text-base text-neutral-500 line-clamp-1 sm:text-lg md:text-xl">
                    @{username || "foydalanuvchi_nomi"}
                  </p>
                </div>
              </>
            )}

            {/* Loading animation */}
            {isLoading && !hasError && (
              <div className="flex items-center justify-center w-full h-32">
                <DotsLoader color="#0085FF" />
              </div>
            )}

            {/* Reload button */}
            {hasError && !isLoading && (
              <div className="flex items-center justify-center w-full h-32">
                <button
                  title="Reload"
                  aria-label="Reload"
                  onClick={loadUserData}
                  className="flex items-center justify-center size-10"
                >
                  <Icon src={reloadIcon} alt="Reload icon" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="text-primary-default text-lg font-medium underline underline-offset-2"
        >
          Akkauntdan chiqish
        </button>
      </div>
    </div>
  );
};

export default Profile;
