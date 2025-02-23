import React from "react";
import { Link } from "react-router-dom";

// Components
import Icon from "./Icon";
import DeleteAlertDialog from "./DeleteAlertDialog";

// Images
import eyeIcon from "@/assets/images/icons/eye.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import starIcon from "@/assets/images/icons/mono-star-filled.svg";

const ProductItem = ({ data = {}, deleteProduct }) => {
  const {
    title,
    images,
    price,
    _id: id,
    discount_price: discountPrice,
  } = data || {};
  const image = images ? images[0]?.medium : "";
  const isValidDiscountPrice =
    Number(discountPrice) !== NaN && discountPrice > 1;

  return (
    <li className="flex flex-col">
      {/* Image wrapper */}
      <div className="relative overflow-hidden mb-1.5 rounded-xl">
        <img
          width={232}
          src={image}
          height={309}
          loading="lazy"
          alt={data.title}
          className="w-full h-auto aspect-[3/4] object-cover bg-white"
        />

        {/* Actions */}
        <div className="flex flex-col gap-3 absolute right-0 inset-y-0 h-full p-2 xs:p-3">
          {/* Eye */}
          <a
            target="_blank"
            className="btn size-9 bg-white rounded-full border xs:size-10"
            href={`https://menemarket.netlify.app/products/product/${id}`}
          >
            <Icon
              src={eyeIcon}
              alt="Eye icon"
              className="size-[22px] xs:size-6"
            />
          </a>

          {/* Edit */}
          <Link
            to={`/products/edit/${id}`}
            className="btn size-9 bg-white rounded-full border xs:size-10"
          >
            <Icon
              src={editIcon}
              alt="Edit icon"
              className="size-[22px] xs:size-6"
            />
          </Link>
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-col justify-between gap-2 grow px-1.5 pb-1.5">
        {/* title */}
        <h3 className="h-[36px] text-sm leading-[18px] line-clamp-2 mb-2">
          {title || "Mahsulot nomi topilmadi"}
        </h3>

        {/* middle */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between relative">
            {/* price wrapper */}
            <div>
              {isValidDiscountPrice && (
                <del className="inline-block text-sm text-neutral-400">
                  {discountPrice?.toLocaleString() || 0}
                </del>
              )}

              {/* price */}
              <p className="text-[15px] leading-4 font-medium">
                {price?.toLocaleString() || 0}
                <span> so'm</span>
              </p>
            </div>

            {/* rating */}
            <div
              className={`flex items-center gap-1.5 absolute right-0 ${
                isValidDiscountPrice && "top-1"
              }`}
            >
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
      </div>
    </li>
  );
};

export default ProductItem;
