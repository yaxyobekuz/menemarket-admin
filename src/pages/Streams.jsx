import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
import DotsLoader from "@/components/DotsLoader";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

import SearchBox from "@/components/SearchBox";
import streamService from "@/api/services/streamService";

const Products = () => {
  const [stream, setStream] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchStream = (streamId) => {
    if (streamId?.length <= 20) return;

    setStream(null);
    setHasError(false);
    setIsLoading(true);

    streamService
      .getStream(streamId)
      .then((stream) => {
        if (stream?.name && stream?.user && stream?.product) setStream(stream);
        else setHasError(true);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const { _id: streamId, name: streamName, user, product } = stream || {};

  return (
    <div className="container py-6 space-y-7">
      <h1>Oqimlar</h1>

      {/* Nav tabs */}
      <nav className="products-layout-tabs">
        <ul className="flex gap-1 max-w-max bg-white p-1 rounded-xl">
          {/* Main */}
          <li>
            <p className="inline-block opacity-50 py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50">
              Asosiy
            </p>
          </li>

          {/* Search */}
          <li>
            <NavLink
              to="/streams"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Qidirish
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Searchbox */}
      <SearchBox onChange={handleSearchStream} />

      {/* Search result */}
      {!isLoading && !hasError && stream && (
        <div className="">
          <ul className="space-y-5">
            {/* Id */}
            <li className="flex gap-2">
              <h3 className="font-medium">Id:</h3>
              <p className="text-neutral-500">{streamId}</p>
            </li>

            {/* Name */}
            <li className="flex gap-2">
              <h3 className="font-medium">Nomi:</h3>
              <p className="text-neutral-500">{streamName}</p>
            </li>

            {/* Product */}
            <li className="space-y-1.5">
              <h3 className="font-medium">Mahsulot</h3>

              <ul className="pl-5 space-y-1.5">
                {/* ID */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Id:</h3>
                  <p className="text-neutral-500">{product?._id}</p>
                </li>

                {/* Name */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Nomi:</h3>
                  <p className="text-neutral-500">{product?.title}</p>
                </li>

                {/* Email */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Narxi:</h3>
                  <p className="text-neutral-500">
                    {product?.price?.toLocaleString()} so'm
                  </p>
                </li>
              </ul>
            </li>

            {/* User */}
            <li className="space-y-1.5">
              <h3 className="font-medium">Foydalanuvchi</h3>

              <ul className="pl-5 space-y-1.5">
                {/* ID */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Id:</h3>
                  <p className="text-neutral-500">{user?._id}</p>
                </li>

                {/* Name */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Ismi:</h3>
                  <p className="text-neutral-500">{user?.name}</p>
                </li>

                {/* Email */}
                <li className="flex gap-2">
                  <h3 className="font-medium">E-pochta:</h3>
                  <p className="text-neutral-500">{user?.email}</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader color="#0085FF" className="flex justify-center w-full" />
      )}

      <div className="text-[17px] text-center">
        {!isLoading &&
          !hasError &&
          !stream &&
          "Bu yerda qidiruv natijalari chiqadi..."}

        {/* Reload button */}
        {hasError && !isLoading && "Noma'lum xatolik yuz berdi :("}
      </div>
    </div>
  );
};

export default Products;
