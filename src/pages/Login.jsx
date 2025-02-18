import React, { useCallback, useState } from "react";

// Api
import api from "@/api/axiosConfig";
import apiEndpoints from "@/api/apiEndpoints";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import LoadingText from "@/components/LoadingText";

// Services
import authService from "@/api/services/authService";

// Redux
import { useDispatch } from "react-redux";
import { updateUser } from "../store/features/userSlice";
import FormInputWrapper from "@/components/FormInputWrapper";

const Login = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (token) window.location.pathname = "/";

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const loadUserData = (token) => {
    api
      .get(apiEndpoints.getUserProfile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        const { status: role } = data;

        if (!["admin", "owner"].includes(role)) {
          return notification.error(
            "Kirish uchun sizning huquqingiz yetarli emas"
          );
        }

        dispatch(updateUser(data));

        // Save JWT token to local storage
        localStorage.setItem("token", token);
      })
      .catch(() => notification.error("Ma'lumotlarni yuklashda xatolik"))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    authService
      .login(formData)
      .then(({ success, token }) => {
        if (!success) return notification.error("Noma'lum xatolik yuz berdi");
        loadUserData(token);
      })
      .catch(() => {
        setIsLoading(false);
        notification.error("E-pochta yoki parol noto'g'ri");
      });
  };

  return (
    <div className="flex items-center justify-center p-4 w-screen h-screen">
      <div className="max-w-sm w-full">
        {/* Title */}
        <h1 className="text-center mb-5 text-xl sm:text-2xl">Kirish</h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          {/* Email */}
          <FormInputWrapper
            required
            id="email"
            type="email"
            name="email"
            label="E-pochta *"
            placeholder="Misol@gmail.com"
            onChange={(value) => handleInputChange("email", value)}
          />

          {/* Password */}
          <FormInputWrapper
            required
            id="password"
            type="password"
            name="password"
            label="Parol *"
            placeholder="Kamida 8 ta belgi"
            onChange={(value) => handleInputChange("password", value)}
          />

          {/* Submit button */}
          <button
            disabled={isLoading}
            className="btn-primary w-full h-10 rounded-lg"
          >
            <LoadingText text="Kirish" loader={isLoading} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
