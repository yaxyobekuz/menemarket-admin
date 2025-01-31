import React from "react";
import { useNavigate } from "react-router-dom";

// Toaster (For notification)
import { notification } from "../notification";

// Services
import authService from "@/api/services/authService";

import { useDispatch } from "react-redux";
import { updateUser } from "../store/features/userSlice";

const Profile = () => {
  const navigate = useNavigate();

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

  return (
    <div className="py-8">
      <div className="container">
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
