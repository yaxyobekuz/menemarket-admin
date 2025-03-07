import React, { useEffect, useState } from "react";

// Data
import addresses from "@/data/addresses";

// Toaster (For notification)
import { notification } from "@/notification";

// Services
import userService from "@/api/services/usersService";
import ordersService from "@/api/services/ordersService";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "@/store/features/ordersSlice";
import { updateWorkers } from "@/store/features/workersSlice";

// Components
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import DotsLoader from "@/components/DotsLoader";
import ButtonTabs from "@/components/ButtonTabs";
import DistributionOrdersTable from "@/components/DistributionOrdersTable";

const DistributionOrders = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allOrders = useSelector((state) => state.orders.data);
  const allWorkers = useSelector((state) => state.workers.data);
  const [isLoadingWorkers, setIsLoadingWorkers] = useState(true);

  const filterOrders = (orders) => {
    return orders?.filter(({ status, client_address: clientAddress }) => {
      const checkedStatus = status === "checked";
      if (!address) return checkedStatus;
      return checkedStatus && clientAddress === address;
    });
  };

  const loadWorkers = () => {
    setIsLoadingWorkers(true);

    userService
      .getWorkers()
      .then((workers) => {
        if (!workers?.length) {
          return notification.error("Nimadir xato ketdi");
        }
        dispatch(updateWorkers(workers));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingWorkers(false));
  };

  const loadOrders = () => {
    setHasError(false);
    setIsLoading(true);

    ordersService
      .getOrders()
      .then((orders) => dispatch(updateOrders(orders)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const handleReload = () => {
    if (allOrders?.length === 0 || !allOrders) loadOrders();
    if (allWorkers?.length === 0 || !allWorkers) loadWorkers();
  };

  useEffect(() => {
    if (allOrders?.length === 0) loadOrders();
    else setTimeout(() => setIsLoading(false), 300);

    if (allWorkers?.length === 0 || !allWorkers) loadWorkers();
    else setTimeout(() => setIsLoadingWorkers(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Buyurtmalarni taqsimlash</h1>

      <div className="flex flex-wrap justify-between gap-5 w-full">
        {/* Nav tabs */}
        <Tabs name="orders" />

        {/* Filter orders by status */}
        <ButtonTabs
          data={addresses}
          onChange={setAddress}
          disabled={isLoading || hasError}
        />
      </div>

      {/* Orders */}
      {!isLoading &&
        !hasError &&
        !isLoadingWorkers &&
        allOrders?.length >= 0 && (
          <div className="overflow-hidden rounded-xl">
            <DistributionOrdersTable orders={filterOrders(allOrders)} />
          </div>
        )}

      {/* Loading animation */}
      {(isLoading || isLoadingWorkers) && !hasError && (
        <DotsLoader
          color="#0085FF"
          className="flex justify-center fixed top-1/2 inset-x-0 w-full"
        />
      )}

      {/* Reload button */}
      {hasError && !isLoading && !isLoadingWorkers && (
        <div className="flex justify-center fixed top-[calc(50%-20px)] inset-x-0">
          <button
            title="Reload"
            aria-label="Reload"
            onClick={handleReload}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DistributionOrders;
