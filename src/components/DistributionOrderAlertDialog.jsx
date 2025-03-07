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
import ordersService from "@/api/services/ordersService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "@/store/features/ordersSlice";

const DistributionOrderAlertDialog = ({ orderId, children, clientName }) => {
  const dispatch = useDispatch();
  const workers = useSelector((state) => state.workers.data);
  const filteredWorkers = workers?.filter(({ status }) => status === "courier");
  const isValidWorkers = filteredWorkers?.length && filteredWorkers?.length > 0;
  const [courierId, setCourierId] = useState(
    filteredWorkers?.length ? filteredWorkers[0]["_id"] : null
  );

  const distributeOrder = () => {
    if (!orderId) return notification.error("Buyurtma belgilanmagan");
    if (!courierId) return notification.error("Yetkazuvchi belgilanmagan");

    notification.promise(
      ordersService
        .distributeOrder(orderId, { courier_id: courierId })
        .then(() => dispatch(updateOrderStatus({ orderId, status: "sent" }))),
      {
        loading: "Buyurtma o'tkazilmoqda...",
        error: "Buyurtmani o'tkazishda xatolik!",
        success: "Buyurtma muvaffaqiyatli o'tkazildi!",
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
          <AlertDialogTitle>Buyurtmani o'tkazish</AlertDialogTitle>
          <AlertDialogDescription>
            <span>Siz </span>
            <b className="">{clientName || "Mijoz ismi mavjud emas!"}</b>
            <span>ning buyurtmasini yetkazuvchiga o'tkazmoqdasiz.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Body */}
        <div className="space-y-2 w-full">
          <label htmlFor="courier" className="pl-1.5">
            Yetkazuvchi *
          </label>

          {/* Select */}
          {isValidWorkers && (
            <select
              id="courier"
              name="courier"
              disabled={!isValidWorkers}
              className="h-10 px-3.5 bg-gray-light"
              onChange={(e) => setCourierId(e.target.value)}
            >
              {isValidWorkers ? (
                filteredWorkers.map(({ _id: id, name }, index) => (
                  <option key={index} value={id}>
                    {name}
                  </option>
                ))
              ) : (
                <option>Yetkazuvchilar topilmadi!</option>
              )}
            </select>
          )}
        </div>

        {/* Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            onClick={distributeOrder}
            disabled={!isValidWorkers}
            className="btn hover:bg-primary-strong"
          >
            O'tkazish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DistributionOrderAlertDialog;
