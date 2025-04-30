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
import DotsLoader from "@/components/DotsLoader";
import { formatUzbekPhoneNumber, sendMessageToTelegram } from "@/utils";

const UltraMegaSuperMuperDistributeOrders = () => {
  const dispatch = useDispatch();
  const [courier, setCourier] = useState(null);
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
      <h1>Ultra Mega Super Muper Buyurtmalarni taqsimlash</h1>

      {/* Select */}
      <div className="sticky top-14 bg-neutral-100 py-2">
        <select
          name="worker"
          className="max-w-max h-14"
          onChange={(e) => setCourier(e.target.value)}
        >
          {!isLoading &&
            allWorkers.map((worker) => {
              return <option value={worker._id}>{worker.name}</option>;
            })}
        </select>
      </div>

      {/* Orders */}
      <div className="border-2 border-primary-default">
        {!isLoading &&
          !hasError &&
          !isLoadingWorkers &&
          allOrders?.length >= 0 &&
          filterOrders(allOrders).map((order, index) => {
            const formattedAddress = addresses.find(({ value }) => {
              return order.client_address === value;
            });

            const send = (e) => {
              e.preventDefault();
              const btn = e.target?.querySelector("button");
              const tel = e.target?.querySelector("#tel").value;
              const name = e.target?.querySelector("#name").value;
              const address = e.target?.querySelector("#address").value;
              const fullAddress = e.target?.querySelector("#fullAddress").value;

              if (!courier) return alert("Kuryer topilmadi!");
              if (!tel || !name || !address || !fullAddress) {
                return alert("Ma'lumotlar xato!");
              }

              btn.disabled = true;
              btn.innerHTML = "Loding...";

              notification.promise(
                ordersService
                  .distributeOrder(order._id, {
                    courier_id: courier,
                  })
                  .then(() => {
                    const chatId = addresses.find(
                      ({ label }) => label === address
                    ).id;

                    btn.innerHTML = "Sakses!";

                    const price = `${(
                      order.product_id?.price + 30000
                    )?.toLocaleString()} so'm`;

                    const message = `📦 Buyurtma Nº ${order.order_code}\n\n🆔 Id raqam: ${order._id}\n\n👤 Mijoz: ${name}\n\n📞 Tel raqam: ${tel}\n\n📍 Manzil: ${address}\n\n💵 Narx: ${price}\n\n🪧 To'liq manzil: ${fullAddress}`;

                    sendMessageToTelegram(chatId, message);
                  }),
                {
                  loading: "Buyurtma o'tkazilmoqda...",
                  error: "Buyurtmani o'tkazishda xatolik!",
                  success: "Buyurtma muvaffaqiyatli o'tkazildi!",
                }
              );
            };

            return (
              <form
                onSubmit={send}
                key={order._id}
                className="flex items-center gap-1 h-14 p-2 border-primary-default focus-within:border-y-2 odd:bg-white"
              >
                <input
                  type="text"
                  id="fullAddress"
                  placeholder={order.full_address}
                  defaultValue={order.full_address}
                  className="shrink-0 w-[712px] h-full bg-blue-100 rounded-none px-3"
                />
                <input
                  id="name"
                  type="text"
                  defaultValue={order.client_name}
                  className="size-full bg-blue-100 rounded-none px-3"
                />
                <select
                  type="text"
                  id="address"
                  className="size-full bg-blue-100 rounded-none px-3"
                  defaultValue={formattedAddress?.label || order.client_address}
                  children={addresses.map(({ label }) => (
                    <option children={label} value={label} />
                  ))}
                />
                <input
                  id="tel"
                  type="text"
                  placeholder={order.client_mobile}
                  className="size-full bg-blue-100 rounded-none px-3"
                  defaultValue={formatUzbekPhoneNumber(order.client_mobile)}
                />
                <button className="btn-primary shrink-0 w-24 h-full rounded-none">
                  O'tkazish
                </button>
              </form>
            );
          })}
      </div>

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

export default UltraMegaSuperMuperDistributeOrders;
