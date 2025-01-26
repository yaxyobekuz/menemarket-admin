import toast from "react-hot-toast";

const options = {
  position: "top-center",
  style: {
    background: "#333",
    borderRadius: "8px",
    padding: "6px 8px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "medium",
  },
};

export const notification = (msg = "Bildirishnoma", icon = "😊") => {
  toast(msg + "!", {
    icon,
    ...options,
  });
};

notification.success = (msg = "Muvaffaqiyatli") => {
  toast.success(msg + "!", options);
};

notification.error = (msg = "Xatolik") => {
  toast.error(msg + "!", options);
};

notification.promise = (
  action,
  msg = {
    loading: "Yuklanmoqda...",
    success: "Muvaffaqiyatli!",
    error: "Xatolik!",
  }
) => {
  toast.promise(action, msg, options);
};
