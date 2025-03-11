import { useState } from "react";

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

// Notification
import { notification } from "@/notification";

// Services
import paymentService from "@/api/services/paymentsService";

// Redux
import { useDispatch } from "react-redux";
import { updatePaymentStatus } from "@/store/features/paymentsSlice";

const PaymentAlertDialog = ({ paymentId, children, amount, userName }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("success");

  const handleChangePaymentStatus = () => {
    if (!paymentId) return notification.error("To'lov ID raqami mavjud emas");
    if (!(status === "success" || status === "reject")) {
      return notification.error("To'lov holati noto'g'ri yoki mavjud emas");
    }

    notification.promise(
      paymentService
        .updatePaymentStatus(paymentId, status)
        .then(({ success }) => {
          if (success) dispatch(updatePaymentStatus({ paymentId, status }));
          else throw new Error();
        }),
      {
        loading: "To'lov holati o'zgartirilmoqda...",
        error: "To'lov holatini o'zgartirishda xatolik!",
        success: "To'lov holati muvaffaqiyatli o'zgartitildi!",
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      {/* Alert dialog content  */}
      <AlertDialogContent>
        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>To'lov holatini o'zgartish</AlertDialogTitle>
          <AlertDialogDescription>
            <span>Siz </span>
            <b>{userName || "Mijoz ismi mavjud emas!"}</b>
            <span>ning </span>
            <b>{amount?.toLocaleString()} so'm</b>
            <span>lik to'lov uchun so'rovini holatini o'zgartirmoqdasiz.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Body */}
        <div className="space-y-2 w-full">
          <label htmlFor="courier" className="pl-1.5">
            Holat *
          </label>

          {/* Select */}
          <select
            id="courier"
            name="courier"
            defaultValue={status}
            className="h-10 px-3.5 bg-gray-light"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="success">Muvaffaqiyatli</option>
            <option value="reject">Qaytarilgan</option>
          </select>
        </div>

        {/* Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleChangePaymentStatus}
            className="btn hover:bg-primary-strong"
          >
            O'zgartirish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentAlertDialog;
