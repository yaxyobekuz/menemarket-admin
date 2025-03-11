import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Data
import roles from "@/data/roles";

// Components
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import avatars from "@/data/avatars";
import SearchBox from "@/components/SearchBox";
import DotsLoader from "@/components/DotsLoader";
import CopyButton from "@/components/CopyButton";

// Utils
import { formatDate, formatTime } from "@/utils";

// Services
import usersService from "@/api/services/usersService";

const SearchUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateByQuery = (userId) => {
    if (userId?.length <= 18) return;

    navigate("/users/search/" + encodeURIComponent(userId), {
      replace: true,
    });
  };

  useEffect(() => {
    if (user?._id !== userId) {
      setHasError(false);
      setIsLoading(true);

      usersService
        .getUserById(userId)
        .then((user) => {
          if (user) setUser(user);
          else throw new Error();
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    } else {
      setHasError(false);
    }
  }, [userId]);

  const {
    avatar,
    name: userName,
    email: userEmail,
    status: userRole,
    balance: userBalance,
    created_at: userCreatedAt,
    telegram_id: userTelegramId,
  } = user || {};

  const formattedRole =
    roles.find(({ value }) => value == userRole)?.name ||
    userRole ||
    "Mavjud emas!";

  const isValidAvatar = String(avatar?.original)?.startsWith("https");

  return (
    <div className="container py-6 space-y-7">
      <h1>Foydalanuvchini qidirish</h1>

      {/* Nav tabs */}
      <Tabs name="users" />

      {/* Searchbox */}
      <SearchBox defaultValue={userId} onChange={handleNavigateByQuery} />

      {/* Search result */}
      {!isLoading && !hasError && user && (
        <>
          <ul className="space-y-5">
            {/* Id */}
            <li className="flex gap-2">
              <h3 className="font-medium">ID:</h3>
              <CopyButton
                text={userId}
                notificationText="ID raqamdan nusxa olindi"
                className="text-neutral-500 disabled:opacity-50"
              >
                {userId || "Mavjud emas!"}
              </CopyButton>
            </li>

            {/* Id */}
            <li className="space-y-2">
              <h3 className="font-medium">Rasmi:</h3>
              <Icon
                size={128}
                alt="User avatar"
                src={isValidAvatar ? avatar.original : avatars["default"][2]}
                className="size-12 bg-white xs:size-14 sm:size-20 md:size-32"
              />
            </li>

            {/* Name */}
            <li className="flex gap-2">
              <h3 className="font-medium">Ismi:</h3>
              <p className="text-neutral-500">{userName || "Mavjud emas!"}</p>
            </li>

            {/* Email */}
            <li className="flex gap-2">
              <h3 className="font-medium">E-pochta:</h3>
              <a
                href={`mailto:${userEmail}`}
                className="text-neutral-500 primary-link"
              >
                {userEmail || "Mavjud emas!"}
              </a>
            </li>

            {/* Telegram Id */}
            <li className="flex gap-2">
              <h3 className="font-medium">Telegram ID:</h3>
              <p className="text-neutral-500">
                {userTelegramId || "Mavjud emas!"}
              </p>
            </li>

            {/* Balance */}
            <li className="flex gap-2">
              <h3 className="font-medium">Balansi:</h3>
              <p className="text-neutral-500">
                {userBalance?.toLocaleString() || "-"} so'm
              </p>
            </li>

            {/* Role */}
            <li className="flex gap-2">
              <h3 className="font-medium">Roli:</h3>
              <p className="text-neutral-500">{formattedRole}</p>
            </li>

            {/* Timestamp (Created At) */}
            <li className="flex gap-2">
              <h3 className="font-medium">Vaqt:</h3>
              <p className="text-neutral-500">
                {formatDate(userCreatedAt) || "Mavjud emas!"}{" "}
                {formatTime(userCreatedAt)}
              </p>
            </li>
          </ul>
        </>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader color="#0085FF" className="flex justify-center w-full" />
      )}

      <p className="text-[17px] text-center">
        {!isLoading &&
          !hasError &&
          !user &&
          "Bu yerda qidiruv natijalari chiqadi..."}

        {/* Reload button */}
        {hasError && !isLoading && "Noma'lum xatolik yuz berdi :("}
      </p>
    </div>
  );
};

export default SearchUser;
