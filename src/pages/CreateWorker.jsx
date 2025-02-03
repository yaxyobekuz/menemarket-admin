import { useCallback, useState } from "react";

// Utils
import { extractNumbers } from "@/utils";

// Toaster (For notification)
import { notification } from "@/notification";

// Services
import authService from "@/api/services/authService";
import usersService from "@/api/services/usersService";

// Components
import Tabs from "@/components/Tabs";
import LoadingText from "@/components/LoadingText";
import FormInputWrapper from "@/components/FormInputWrapper";

const Users = () => {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const handleWorkerCreate = (e) => {
    e.preventDefault();

    const { name, email, password } = formData || {};
    const isValidFormData =
      name?.length > 1 && email?.length > 3 && password?.length > 3;

    if (isLoading || !isValidFormData) {
      return notification.error("Ma'lumotlar to'g'ri kiritilmadi");
    }

    setIsLoading(true);
    setLoginData(formData);

    usersService
      .createWorker(formData)
      .then(({ data, status }) => {
        const { userid: userId } = data || {};

        if (status !== "KUTILMOQDA") {
          return notification.error("Nimadir xato ketdi");
        }

        setUserId(userId);
      })
      .catch(() => notification.error("Nimadir xato ketdi"))
      .finally(() => setIsLoading(false));
  };

  const handelVerifyOtp = (e) => {
    e.preventDefault();

    if (isLoading || !userId) {
      return notification.error("Hali akkaunt yaratilinmadi");
    }

    if (extractNumbers(code)?.length !== 4) {
      return notification.error("Kod noto'g'ri kiritildi");
    }

    setIsLoading(true);

    const formData = {
      userid: userId,
      code: extractNumbers(code),
    };

    authService
      .verifyOtp(formData)
      .then(({ status, message }) => {
        if (status === "TEKSHIRILDI") {
          const { name: firstName, email, password } = loginData || {};
          const message = `Akkaunt muvaffaqiyatli tasdiqlandi\n\nIsm: ${firstName}\nE-pochta: ${email}\nParol: ${password}`;
          alert(message);
        } else {
          notification.error(message || "Noma'lum xatolik yuz berdi");
        }
      })
      .catch(() => {
        notification.error("Kodni tekshirishda noma'lum xatolik yuz berdi");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container py-6 space-y-7">
      <h1>Ishchi yaratish</h1>

      {/* Nav tabs */}
      <Tabs name="users" />

      {/* Create */}
      {!userId && (
        <section className="bg-white space-y-3.5 p-8 pt-6 rounded-xl">
          <h2>Yaratish</h2>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleWorkerCreate}>
            <div className="flex gap-5 w-full">
              <FormInputWrapper
                required
                type="email"
                name="email"
                label="E-pochta *"
                disabled={isLoading}
                className="gray-input"
                placeholder="Misol@gmail.com"
                onChange={(value) => handleInputChange("email", value)}
              />

              <FormInputWrapper
                required
                name="password"
                type="password"
                label="Parol *"
                disabled={isLoading}
                className="gray-input"
                placeholder="Kamida 8ta belgi"
                onChange={(value) => handleInputChange("password", value)}
              />
            </div>

            {/* Bottom */}
            <div className="flex items-end gap-5 w-full">
              <FormInputWrapper
                required
                label="Ism *"
                name="firstName"
                disabled={isLoading}
                placeholder="Admin #1"
                className="gray-input"
                onChange={(value) => handleInputChange("name", value)}
              />

              {/* Submit button */}
              <button disabled={isLoading} className="btn-primary w-full h-11">
                <LoadingText text="Yaratish" loader={isLoading} />
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Verify OTP */}
      {userId && (
        <section className="bg-white space-y-3.5 p-8 pt-6 rounded-xl">
          <h2>Tasdiqlash</h2>

          {/* Form */}
          <form onSubmit={handelVerifyOtp} className="space-y-5">
            {/* Bottom */}
            <div className="flex items-end gap-5 w-full">
              <FormInputWrapper
                required
                name="otp"
                type="otp"
                label="Kod *"
                disabled={isLoading}
                placeholder="_ _ _ _"
                className="gray-input"
                onChange={(value) => setCode(value)}
              />

              {/* Submit button */}
              <button disabled={isLoading} className="btn-primary w-full h-11">
                <LoadingText text="Tasdiqlash" loader={isLoading} />
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default Users;
