import React, { useState } from "react";

// Utils
import { formatDate } from "@/utils";

// Components
import Tabs from "@/components/Tabs";
import SearchBox from "@/components/SearchBox";
import DotsLoader from "@/components/DotsLoader";

// Services
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
      .then(({ stream }) => {
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
      <Tabs name="streams" />

      {/* Searchbox */}
      <SearchBox onChange={handleSearchStream} />

      {/* Search result */}
      {!isLoading && !hasError && stream && (
        <>
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
                  <a
                    target="_blank"
                    aria-label="Product link"
                    className="primary-link text-neutral-500"
                    href={`https://menemarket.netlify.app/products/product/${product?._id}`}
                  >
                    {product?._id}
                  </a>
                </li>

                {/* Name */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Nomi:</h3>
                  <p className="text-neutral-500">{product?.title}</p>
                </li>

                {/* Price */}
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

                {/* Timestamp */}
                <li className="flex gap-2">
                  <h3 className="font-medium">Ro'yxatdan o'tgan sana:</h3>
                  <p className="text-neutral-500">
                    {formatDate(user?.created_at)}
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
