import { useEffect, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import DotsLoader from "@/components/DotsLoader";
import UsersTable from "@/components/UsersTable";

// Services
import usersService from "@/api/services/usersService";

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
      usersService.deleteUser(id).then(() => {
        setFilteredUsers((users) => users.filter(({ _id }) => _id !== id));
      }),
      {
        loading: "Foydalanuvchi o'chirilmoqda...",
        success: "Foydalanuvchi muvaffaqiyatli o'chirildi!",
        error: "Foydalanuvchini o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadUsers = () => {
    setHasError(false);
    setIsLoading(true);

    usersService
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
      <Tabs name="users" />

      {/* Users */}
      {!isLoading && !hasError && filteredUsers?.length >= 0 && (
        <div className="overflow-hidden rounded-xl">
          <UsersTable users={filteredUsers} deleteUser={handleDeleteUser} />
        </div>
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
            onClick={loadUsers}
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
