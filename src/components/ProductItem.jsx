import React from "react";
import { Link } from "react-router-dom";

// Components
import Icon from "./Icon";
import DeleteAlertDialog from "./DeleteAlertDialog";

// Images
import starIcon from "@/assets/images/icons/mono-star-filled.svg";

const ProductItem = ({ data = {}, deleteProduct }) => {
  const { title, images, price, _id: id } = data || {};
  const image = images ? images[0]?.medium : "";

  return (
    <li className="relative">
      {/* Image wrapper */}
      <div className="relative overflow-hidden mb-1.5 rounded-xl">
        <img
          width={232}
          height={309}
          src={image}
          loading="lazy"
          alt={data.title}
          className="w-full h-auto aspect-[3/4] object-cover bg-white"
        />
      </div>

      {/* Product details */}
      <div className="flex flex-col justify-between gap-2 px-1.5 pb-1.5">
        {/* title */}
        <h3 className="h-[36px] text-sm leading-[18px] line-clamp-2 mb-2">
          {title || "Mahsulot nomi topilmadi"}
        </h3>

        {/* middle */}
        <div className="flex items-start justify-between">
          {/* price wrapper */}
          <div>
            <del className="inline-block text-sm text-neutral-400">
              {price?.toLocaleString() || 0}
            </del>

            {/* price */}
            <p className="text-[15px] leading-4 font-medium">
              {price?.toLocaleString() || 0}
              <span> so'm</span>
            </p>
          </div>

          {/* rating */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-neutral-400 leading-none">4.8</span>

            {/* star */}
            <Icon
              size={14}
              alt="Star icon"
              src={starIcon}
              className="size-3.5"
            />
          </div>
        </div>

        {/* bottom */}

        <DeleteAlertDialog
          title="Mahsulotni o'chirish"
          action={() => deleteProduct(id)}
          description={
            <>
              <span>Siz haqiqatdan ham </span>
              <b className="font-semibold">{title?.slice(0, 144)}</b>
              <span> nomli mahsulotni o'chirmoqchimisiz?</span>
            </>
          }
        >
          <button className="btn-primary z-10 bg-red-500 h-9 font-normal hover:bg-red-600">
            O'chirish
          </button>
        </DeleteAlertDialog>
      </div>

      {/* Link */}
      <Link
        to={`/products/product/${id}`}
        className="absolute inset-0 size-full rounded-xl"
      />
    </li>
  );
};

export default ProductItem;
