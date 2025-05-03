import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Tabs from "@/components/Tabs";
import SearchBox from "@/components/SearchBox";
import DotsLoader from "@/components/DotsLoader";

// Data
import roles from "@/data/roles";
import addresses from "@/data/addresses";
import orderStatuses from "@/data/orderStatuses";

// Services
import ordersService from "@/api/services/ordersService";

// Utils
import { extractNumbers, formatDate, formatTime } from "@/utils";

const GetOrderById = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateByQuery = (orderId) => {
    if (orderId?.length <= 18) return;

    navigate("/orders/get-order-by-id/" + encodeURIComponent(orderId), {
      replace: true,
    });
  };

  useEffect(() => {
    if (order?._id !== orderId) {
      setHasError(false);
      setIsLoading(true);

      ordersService
        .getOrder(orderId)
        .then((order) => {
          if (order?.client_address) setOrder(order);
          else setHasError(true);
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    } else {
      setHasError(false);
    }
  }, [orderId]);

  const {
    user_id: user,
    oqim_id: stream,
    desc: description,
    product_id: product,
    status: orderStatus,
    courier_id: courierId,
    created_at: timestamp,
    order_code: orderCode,
    client_name: clientName,
    operator_id: operatorId,
    full_address: fullAddress,
    client_mobile: clientMobile,
    client_address: clientAddress,
  } = order || {};

  const totalPrice = product?.price + 30000 || "0";

  const {
    _id: productId,
    title: productTitle,
    price: productPrice,
    ads_post: productAdPost,
    for_seller: sellerCommission,
    discount_price: productDiscountPrice,
  } = product || {};

  const {
    _id: streamId,
    name: streamName,
    created_at: streamCreatedAt,
  } = stream || {};

  const {
    _id: userId,
    name: userName,
    email: userEmail,
    status: userRole,
    balance: userBalance,
    created_at: userCreatedAt,
    telegram_id: userTelegramId,
  } = user || {};

  const formattedAddress =
    addresses.find(({ value }) => value == clientAddress)?.label ||
    clientAddress ||
    "Mavjud emas!";

  const formattedStatus =
    orderStatuses.find(({ value }) => value == orderStatus)?.label ||
    orderStatus;

  const formattedRole =
    roles.find(({ value }) => value == userRole)?.name ||
    userRole ||
    "Mavjud emas!";

  const statusColor =
    orderStatuses.find(({ value }) => value == orderStatus)?.color || "black";

  return (
    <div className="container py-6 space-y-7">
      <h1>Buyurtmani qidirish</h1>

      {/* Nav tabs */}
      <Tabs name="orders" />

      {/* Searchbox */}
      <SearchBox defaultValue={orderId} onChange={handleNavigateByQuery} />

      {/* Search result */}
      {!isLoading && !hasError && order && (
        <>
          <ul className="space-y-5">
            {/* Id */}
            <li className="flex gap-2">
              <h3 className="font-medium">Id:</h3>
              <p className="text-neutral-500">{orderId || "Mavjud emas!"}</p>
            </li>

            {/* Status */}
            <li className="flex gap-2">
              <h3 className="font-medium">Holati:</h3>
              <p className="text-neutral-500" style={{ color: statusColor }}>
                {formattedStatus}
              </p>
            </li>

            {/* Client */}
            <li className="flex gap-2">
              <h3 className="font-medium">Foydalanuvchi:</h3>
              <p className="text-neutral-500">{clientName || "Mavjud emas!"}</p>
            </li>

            {/* Tel */}
            <li className="flex gap-2">
              <h3 className="font-medium">Telefon raqam:</h3>
              <a
                className="text-neutral-500 primary-link"
                href={`tel:+${extractNumbers(clientMobile)}`}
              >
                {clientMobile || "Mavjud emas!"}
              </a>
            </li>

            {/* Address */}
            <li className="flex gap-2">
              <h3 className="font-medium">Manzil:</h3>
              <address className="text-neutral-500">
                {formattedAddress || "Mavjud emas!"}
              </address>
            </li>

            {/* Order number */}
            <li className="flex gap-2">
              <h3 className="font-medium">Buyurtma raqami:</h3>
              <p className="text-neutral-500">{orderCode || "Mavjud emas!"}</p>
            </li>

            {/* Courier Id */}
            <li className="flex gap-2">
              <h3 className="font-medium">Yetkazuvchi:</h3>
              <a
                target="_blank"
                href={`/users/search/${courierId}`}
                className="text-neutral-500 primary-link"
              >
                {courierId || "Mavjud emas!"}
              </a>
            </li>

            {/* Operator Id */}
            <li className="flex gap-2">
              <h3 className="font-medium">Operator:</h3>
              <a
                target="_blank"
                href={`/users/search/${operatorId}`}
                className="text-neutral-500 primary-link"
              >
                {operatorId || "Mavjud emas!"}
              </a>
            </li>

            {/* Total price */}
            <li className="flex gap-2">
              <h3 className="font-medium">Umumiy narx:</h3>
              <p className="text-neutral-500">
                {totalPrice?.toLocaleString() || "-"} so'm
              </p>
            </li>

            {/* Full address */}
            <li className="flex gap-2">
              <h3 className="font-medium">To'liq manzil:</h3>
              <address className="text-neutral-500">
                {fullAddress || "Mavjud emas!"}
              </address>
            </li>

            {/* Description */}
            <li className="flex gap-2">
              <h3 className="font-medium">Izoh:</h3>
              <p className="text-neutral-500">
                {description || "Mavjud emas!"}
              </p>
            </li>

            {/* Timestamp (Created At) */}
            <li className="flex gap-2">
              <h3 className="font-medium">Vaqt:</h3>
              <p className="text-neutral-500">
                {formatDate(timestamp) || "Mavjud emas!"}{" "}
                {formatTime(timestamp)}
              </p>
            </li>

            {/* Product */}
            <li className="space-y-1.5">
              <h3 className="font-medium">Mahsulot</h3>

              <ul className="pl-5 space-y-1.5">
                {/* ID */}
                <li className="flex gap-2">
                  <h4 className="font-medium">Id:</h4>
                  <a
                    target="_blank"
                    aria-label="Product link"
                    className="primary-link text-neutral-500"
                    href={`https://menemarket.uz/products/product/${productId}`}
                  >
                    {productId}
                  </a>
                </li>

                {/* Name */}
                <li className="flex gap-2">
                  <h4 className="font-medium">Nomi:</h4>
                  <p className="text-neutral-500">{productTitle}</p>
                </li>

                {/* Price */}
                <li className="flex gap-2">
                  <h4 className="font-medium">Asl narx:</h4>
                  <p className="text-neutral-600">
                    {productPrice?.toLocaleString()} so'm
                  </p>
                </li>

                {/* Discount price */}
                <li className="flex gap-2">
                  <h4 className="font-medium">Chegirma narxi:</h4>
                  <del className="text-neutral-500">
                    {productDiscountPrice?.toLocaleString() || "-"} so'm
                  </del>
                </li>

                {/* Bonus price */}
                <li className="flex gap-2">
                  <h4 className="font-medium">Sotuvchi uchun narx:</h4>
                  <p className="text-neutral-500">
                    {sellerCommission?.toLocaleString() || "-"} so'm
                  </p>
                </li>

                {/* Ads post */}
                <li className="flex gap-2">
                  <h4 className="font-medium">Reklama posti:</h4>
                  <a
                    target="_blank"
                    href={productAdPost}
                    className="text-neutral-500 primary-link"
                  >
                    {productAdPost ? "Havola" : "Mavjud emas!"}
                  </a>
                </li>
              </ul>
            </li>

            {/* User */}
            <li className="space-y-1.5">
              <h3 className="font-medium">Sotuvchi</h3>

              <ul className="pl-5 space-y-1.5">
                {/* Id */}
                <li className="flex gap-2">
                  <h3 className="font-medium">ID:</h3>
                  <a
                    target="_blank"
                    href={`/users/search/${userId}`}
                    className="text-neutral-500 primary-link"
                  >
                    {userId || "Mavjud emas!"}
                  </a>
                </li>

                {/* Name */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Ismi:</h3>
                  <p className="text-neutral-500">
                    {userName || "Mavjud emas!"}
                  </p>
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
            </li>

            {/* Stream */}
            <li className="space-y-1.5">
              <h3 className="font-medium">Oqim</h3>

              <ul className="pl-5 space-y-1.5">
                {/* Id */}
                <li className="flex gap-2">
                  <h3 className="font-medium">ID:</h3>
                  <p className="text-neutral-500">
                    {streamId || "Mavjud emas!"}
                  </p>
                </li>

                {/* Name */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Nomi:</h3>
                  <p className="text-neutral-500">
                    {streamName || "Mavjud emas!"}
                  </p>
                </li>

                {/* Timestamp (Created At) */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Vaqt:</h3>
                  <p className="text-neutral-500">
                    {formatDate(streamCreatedAt) || "Mavjud emas!"}{" "}
                    {formatTime(streamCreatedAt)}
                  </p>
                </li>
              </ul>
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
          !order &&
          "Bu yerda qidiruv natijalari chiqadi..."}

        {/* Reload button */}
        {hasError && !isLoading && "Noma'lum xatolik yuz berdi :("}
      </p>
    </div>
  );
};

export default GetOrderById;
