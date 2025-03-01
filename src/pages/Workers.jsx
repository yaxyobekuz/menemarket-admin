import { useEffect, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import DotsLoader from "@/components/DotsLoader";
import UsersTable from "@/components/UsersTable";
import ButtonTabs from "@/components/ButtonTabs";

// Services
import userService from "@/api/services/usersService";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateWorkers } from "@/store/features/workersSlice";

const Workers = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allWorkers = useSelector((state) => state.workers.data);
  const [filteredWorkers, setFilteredWorkers] = useState(allWorkers || []);

  const handleDeleteUser = (id) => {
    notification.promise(
      userService.deleteUser(id).then(() => {
        dispatch(updateWorkers(allWorkers.filter(({ _id }) => _id !== id)));
        setFilteredWorkers(filteredWorkers.filter(({ _id }) => _id !== id));
      }),
      {
        loading: "Foydalanuvchi o'chirilmoqda...",
        success: "Foydalanuvchi muvaffaqiyatli o'chirildi!",
        error: "Foydalanuvchini o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadWorkers = () => {
    setHasError(false);
    setIsLoading(true);

    userService
      .getWorkers()
      .then((workers) => {
        setFilteredWorkers(workers);
        dispatch(updateWorkers(workers));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const filterWorkersByStatus = (value) => {
    if (!value) return setFilteredWorkers(allWorkers);
    const filtered = allWorkers.filter(({ status }) => status === value);
    setFilteredWorkers(filtered);
  };

  useEffect(() => {
    if (!allWorkers) loadWorkers();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>
        <span>Ishchilar</span>
        <span className="text-neutral-400"> ({allWorkers?.length || 0})</span>
      </h1>

      <div className="flex flex-wrap justify-between gap-5 w-full">
        {/* Nav tabs */}
        <Tabs name="users" />

        {/* Filter workers by status */}
        <ButtonTabs
          onChange={filterWorkersByStatus}
          disabled={isLoading || hasError}
          data={[
            {
              label: "Admin",
              value: "admin",
            },
            {
              label: "Operator",
              value: "operator",
            },
            {
              label: "Yetkazuvchi",
              value: "courier",
            },
          ]}
        />
      </div>

      {/* Workers */}
      {!isLoading && !hasError && filteredWorkers?.length >= 0 && (
        <div className="overflow-hidden rounded-xl">
          <UsersTable users={filteredWorkers} deleteUser={handleDeleteUser} />
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
            onClick={loadWorkers}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Workers;
