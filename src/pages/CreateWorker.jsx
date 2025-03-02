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
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ status: "admin" });

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const handleWorkerCreate = (e) => {
    e.preventDefault();

    const { name, email, password, status } = formData || {};

    const isValidFormData =
      name?.length && email?.length && password?.length && status?.length;

    if (isLoading || !isValidFormData) {
      return notification.error("Ma'lumotlar to'g'ri kiritilmadi");
    }

    setIsLoading(true);

    usersService
      .createWorker(formData)
      .then(({ name, email, status, _id: id }) => {
        if (name && email && status) {
          setUser({ name, email, password, status, id });
          notification.success("Yangi ishchi yaratildi");
        } else notification.error("Nimadir xato ketdi");
      })
      .catch(() => notification.error("Nimadir xato ketdi"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container py-6 space-y-7">
      <h1>Ishchi yaratish</h1>

      {/* Nav tabs */}
      <Tabs name="users" />

      {/* Create */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <form
          onSubmit={handleWorkerCreate}
          className="bg-white space-y-5 p-4 pt-6 rounded-xl xs:p-5 sm:p-8"
        >
          <div className="flex flex-col gap-5 w-full sm:flex-row">
            <FormInputWrapper
              required
              label="Ism *"
              name="firstName"
              disabled={isLoading}
              placeholder="Admin #1"
              className="gray-input"
              onChange={(value) => handleInputChange("name", value)}
            />

            <div className="group flex flex-col items-center justify-center gap-2 relative overflow-hidden w-full rounded-b-lg">
              <div className="w-full">
                <label htmlFor="role" className="pl-1.5">
                  Roli *
                </label>
              </div>

              {/* Select */}
              <select
                name="role"
                id="role"
                disabled={isLoading}
                className="h-11 px-3.5 bg-gray-light"
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="courier">Yetkazuvchi</option>
                <option value="operator">Operator</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full sm:flex-row">
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

          {/* Submit button */}
          <button disabled={isLoading} className="btn-primary w-full h-11">
            <LoadingText text="Yaratish" loader={isLoading} />
          </button>
        </form>

        {/* User data */}
        <div className="flex items-center bg-white space-y-3.5 p-4 pt-6 rounded-xl xs:p-5 sm:p-8">
          <ul className="space-y-5">
            {/* ID */}
            <li className="flex items-center gap-3">
              <h3 className="font-medium">ID: </h3>
              <p className="text-neutral-500">{user?.id || "Kutilmoqda"}</p>
            </li>

            {/* First name */}
            <li className="flex items-center gap-3">
              <h3 className="font-medium">Ism: </h3>
              <p className="text-neutral-500">{user?.name || "Kutilmoqda"}</p>
            </li>

            {/* Role */}
            <li className="flex items-center gap-3">
              <h3 className="font-medium">Rol: </h3>
              <p className="text-neutral-500">{user?.status || "Kutilmoqda"}</p>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <h3 className="font-medium">E-pochta: </h3>
              <p className="text-neutral-500">{user?.email || "Kutilmoqda"}</p>
            </li>

            {/* Password */}
            <li className="flex items-center gap-3">
              <h3 className="font-medium">Parol: </h3>
              <p className="text-neutral-500">
                {user?.password || "Kutilmoqda"}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
