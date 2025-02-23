import React from "react";

// Data
import avatars from "@/data/avatars";

// Components
import Icon from "./Icon";
import DeleteAlertDialog from "./DeleteAlertDialog";

// Images
import deleteIcon from "../assets/images/icons/delete.svg";
import yellowStarIcon from "../assets/images/icons/mono-star-filled.svg";
import grayStarIcon from "../assets/images/icons/mono-gray-star-filled.svg";

const renderStars = (rating = 0, showRatingValue = true, size = 16) => {
  return (
    <div className="flex items-center gap-3.5 shrink-0">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 5 }, (_, i) =>
          rating > i ? (
            <Icon
              key={i}
              alt="Like icon"
              size={size || 16}
              src={yellowStarIcon}
              className="aspect-square"
              style={{ width: `${size || 16}px`, height: `${size || 16}px` }}
            />
          ) : (
            <Icon
              key={i}
              alt="Like icon"
              size={size || 16}
              src={grayStarIcon}
              className="aspect-square"
              style={{ width: `${size || 16}px`, height: `${size || 16}px` }}
            />
          )
        )}
      </div>

      {showRatingValue && (
        <span className="text-neutral-400">{rating || 0}</span>
      )}
    </div>
  );
};

const CommentItem = ({ data, deleteComment }) => {
  const {
    rating,
    gender,
    _id: id,
    commentor: name,
    comment: description,
  } = data || {};

  const splittedText = description.split(" ");
  const isLongDescription = splittedText.some((_) => _?.length >= 32);

  return (
    <li className="flex items-start gap-3.5 w-full bg-neutral-50/70 p-3.5 rounded-xl border transition-colors duration-200 hover:bg-neutral-50 xs:p-4 xs:gap-4 sm:p-5 sm:gap-5">
      {/* User avatar */}
      <Icon
        size={48}
        alt="User avatar"
        src={avatars[gender][0]}
        className="size-10 shrink-0 bg-gray-light object-cover rounded-full xs:size-11 sm:size-12"
      />

      {/* details */}
      <div className="space-y-1.5 w-[calc(100%-54px)] xs:w-[calc(100%-60px)] sm:w-[calc(100%-68px)]">
        <div className="flex items-center justify-between">
          <h3
            aria-label="Author name"
            className="font-medium line-clamp-1 text-base sm:text-lg"
          >
            {name}
          </h3>

          <div className="flex items-center gap-4">
            {renderStars(rating, false)}

            {/* Delete button */}
            <DeleteAlertDialog
              title="Izohni o'chirish"
              action={() => deleteComment(id)}
              description={
                <>
                  <span>Siz haqiqatdan ham </span>
                  <b className="font-semibold">{name?.slice(0, 144)}</b>
                  <span> ning izohini o'chirmoqchimisiz?</span>
                </>
              }
            >
              <button className="btn size-7">
                <Icon src={deleteIcon} alt="Delete icon" />
              </button>
            </DeleteAlertDialog>
          </div>
        </div>

        {/* description */}
        <p className="text-neutral-400 text-sm xs:text-base">
          {isLongDescription
            ? "Matn uzunligi belgilangan miqdordan oshib ketgani sababli yashirildi."
            : description}
        </p>
      </div>
    </li>
  );
};

export default CommentItem;
