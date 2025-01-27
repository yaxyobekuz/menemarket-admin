import React from "react";
import { Link } from "react-router-dom";

// Components
import Icon from "./Icon";

// Utils
import { formatDate } from "@/utils";

// Ui components
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const UserItem = ({ data, handleDeleteUser }) => {
  const {
    name,
    email,
    status,
    balance,
    _id: id,
    created_at: timestamp,
  } = data || {};

  return (
    <li className="relative">
      <Icon
        size={216}
        alt="User avatar"
        className="w-full h-auto bg-white aspect-square object-cover rounded-xl mb-1.5"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLgAc_r0iM6ICF5ITn4C0RwUQNYLDLwQMFZQ&s"
      />

      <div className="px-1.5 pb-1.5 space-y-2">
        {/* Title */}
        <h3 className="h-[36px] text-[15px] leading-[18px] line-clamp-2">
          {name || "Foydalanuvchi ismi topilmadi"}
        </h3>

        {/* Middle */}
        <div className="space-y-0.5">
          {/* Balance */}
          <p className="text-neutral-500 text-[15px]">
            {balance?.toLocaleString() || 0} so'm
          </p>

          {/* Email */}
          <p className="text-neutral-500 text-[15px] line-clamp-1">
            {email || "Email topilmadi!"}
          </p>

          {/* Status */}
          <p className="text-green-500 line-clamp-1">
            {status || "Email topilmadi!"}
          </p>

          {/* Timestamp */}
          <p className="text-neutral-500 text-[15px] line-clamp-1">
            {formatDate(timestamp) || "Sana topilmadi!"}
          </p>
        </div>

        {/* bottom */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="btn-primary relative z-10 w-full bg-red-500 h-9 font-normal hover:bg-red-600">
              O'chirish
            </button>
          </AlertDialogTrigger>

          {/* Alert dialog content  */}
          <AlertDialogContent>
            {/* Header */}
            <AlertDialogHeader>
              <AlertDialogTitle>Ishonchingiz komilmi?</AlertDialogTitle>
              <AlertDialogDescription>
                <span>Siz haqiqatdan ham </span>
                <b className="font-semibold">
                  {name?.slice(0, 144) || "Foydalanuvchi ismi topilmadi"}
                </b>
                <span>'ni o'chirmoqchimisiz.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Footer */}
            <AlertDialogFooter>
              <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteUser(id)}
                className="bg-red-500 hover:bg-red-600"
              >
                O'chirish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Link */}
      <Link
        to={`/users/user/${id}`}
        className="absolute inset-0 z-0 size-full rounded-xl"
      />
    </li>
  );
};

export default UserItem;
