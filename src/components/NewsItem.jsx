import React from "react";
import { Link } from "react-router-dom";

// Components
import DeleteAlertDialog from "./DeleteAlertDialog";

const NewsItem = ({ data = {}, deleteNews }) => {
  const { title, _id: id, banner: image, desc: description } = data || {};

  return (
    <li className="relative">
      {/* Image wrapper */}
      <div className="relative overflow-hidden mb-1.5 rounded-xl">
        <img
          width={293}
          height={219}
          loading="lazy"
          alt={data.title}
          src={image?.medium}
          className="w-full h-auto aspect-[4/3] object-cover bg-white"
        />
      </div>

      {/* Product details */}
      <div className="flex flex-col justify-between gap-3 px-1.5 pb-1.5">
        {/* title */}
        <h3 className="h-[36px] text-base font-medium leading-[18px] line-clamp-2">
          {title || "Yangilik sarlavhasi topilmadi"}
        </h3>

        {/* description */}
        <p className="h-[36px] text-sm leading-[18px] text-neutral-500 line-clamp-2">
          {description || "Yangilik izohi topilmadi"}
        </p>

        {/* bottom */}
        <DeleteAlertDialog
          action={() => deleteNews(id)}
          title="Yangilikni o'chirish"
          description={
            <>
              <span>Siz haqiqatdan ham </span>
              <b className="font-semibold">{title?.slice(0, 144)}</b>
              <span> nomli yangilikni o'chirmoqchimisiz?</span>
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
        to={`/news/product/${id}`}
        className="absolute inset-0 size-full rounded-xl"
      />
    </li>
  );
};

export default NewsItem;
