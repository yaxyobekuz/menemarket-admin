import React, { useCallback, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import LoadingText from "@/components/LoadingText";

// Services
import authService from "@/api/services/authService";

const Login = () => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    authService
      .login(formData)
      .then(({ success, token }) => {
        if (!success) return notification.error("Noma'lum xatolik yuz berdi");

        // Save JWT token to local storage
        localStorage.setItem("token", token);

        // Navigate to homepage
        // window.location.pathname = "/";
      })
      .catch(() => notification.error("E-pochta yoki parol noto'g'ri"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex items-center justify-center p-4 w-screen h-screen">
      <div className="max-w-md">
        {/* Title */}
        <h1 className="text-center mb-5 text-xl sm:text-2xl">Kirish</h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="ml-1.5" htmlFor="email">
              E-pochta *
            </label>

            {/* Input */}
            <input
              required
              id="email"
              type="email"
              name="email"
              className="h-11 px-3.5"
              placeholder="Misol@gmail.com"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="ml-1.5" htmlFor="password">
              Parol *
            </label>

            {/* Input */}
            <input
              required
              id="password"
              name="password"
              type="password"
              className="h-11 px-3.5"
              placeholder="Kamida 8 ta belgi"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>

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
