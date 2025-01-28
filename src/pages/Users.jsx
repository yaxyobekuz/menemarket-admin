import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
import UserItem from "@/components/UserItem";
import DotsLoader from "@/components/DotsLoader";

// Services
import userService from "@/api/services/userService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "@/store/features/usersSlice";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

const Users = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allUsers = useSelector((state) => state.users.data);
  const [filteredUsers, setFilteredUsers] = useState(allUsers || []);

  const handleDeleteUser = (id) => {
    notification.promise(
      userService.deleteUser(id).then(() => {
        setFilteredUsers((users) => users.filter(({ _id }) => _id !== id));
      }),
      {
        loading: "Foydalanuvchi o'chirilmoqda...",
        success: "Foydalanuvchi muvaffaqiyatli o'chirildi!",
        error: "Foydalanuvchi o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadUsers = () => {
    setHasError(false);
    setIsLoading(true);

    userService
      .getUsers()
      .then((users) => {
        setFilteredUsers(users);
        dispatch(updateUsers(users));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allUsers?.length === 0) loadUsers();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>
        <span>Foydalanuvchilar</span>
        <span className="text-neutral-400"> ({allUsers?.length || 0})</span>
      </h1>

      {/* Nav tabs */}
      <nav className="products-layout-tabs">
        <ul className="flex gap-1 max-w-max bg-white p-1 rounded-xl">
          {/* Main */}
          <li>
            <NavLink
              end
              to="/users"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Asosiy
            </NavLink>
          </li>

          {/* Product */}
          <li>
            <NavLink
              to="/users/new-user"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Ishchi yaratish
            </NavLink>
          </li>

          {/* Search */}
          <li>
            <NavLink
              to="/users/search"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Qidirish
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Products */}
      {!isLoading && !hasError && filteredUsers?.length >= 0 && (
        <ul className="grid grid-cols-8 gap-5">
          {filteredUsers.map((user) => (
            <UserItem
              key={user._id}
              data={user}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </ul>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader
          color="#0085FF"
          className="flex justify-center fixed top-1/2 inset-x-0 w-full"
        />
      )}

      {/* Reload button */}
      {hasError && !isLoading && (
        <div className="flex justify-center fixed top-[calc(50%-20px)] inset-x-0">
          <button
            title="Reload"
            aria-label="Reload"
            onClick={loadProducts}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
