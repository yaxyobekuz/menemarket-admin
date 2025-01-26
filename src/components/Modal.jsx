import React, { useState } from "react";

// Toaster (For notification)
import { notification } from "../notification";

// Images
import crossIcon from "../assets/images/icons/cross.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { resetModal } from "../store/features/modalSlice";

// Services
import streamService from "../api/services/streamService";

// Components
import Icon from "./Icon";
import Overlay from "./Overlay";
import LoadingText from "./LoadingText";
import ContactModalContent from "./ContactModalContent";
import CallOrderModalContent from "./CallOrderModalContent";
import CreateStreamModalContent from "./CreateStreamModalContent";
import CreateCommentModalContent from "./CreateCommentModalContent";
import commentService from "@/api/services/commentService";

const Modal = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const closeModal = () => dispatch(resetModal());
  const [isLoading, setIsLoading] = useState(false);
  const { title, name, buttons, data } = useSelector((state) => state.modal);

  const checkValueLength = (value = "", length = 3) => {
    return (value?.trim()?.length || 0) < length;
  };

  const sendUserCallOrderToServer = () => {
    notification("Vahui", "🗿");
  };

  const createStream = () => {
    const { name } = formData;

    if (checkValueLength(name)) {
      return notification.error("Oqim nomi noto'g'ri kiritildi");
    }

    closeModal();
    const { id } = data.product;

    notification.promise(streamService.createStream(id, formData), {
      loading: "Oqim yaratilmoqda...",
      success: "Oqim muvaffaqiyatli yaratildi!",
      error: "Oqim yaratishda xatolik yuz berdi!",
    });
  };

  const createComment = () => {
    const { productId } = data || {};
    const { comment, commentor, gender, rating } = formData;

    if (checkValueLength(commentor)) {
      return notification.error("Ism noto'g'ri kiritildi");
    }

    if (checkValueLength(comment)) {
      return notification.error("Izoh noto'g'ri kiritildi");
    }

    if (!["male", "female"].includes(gender)) {
      return notification.error("Jins noto'g'ri kiritildi");
    }

    if (rating > 5 || rating <= 0) {
      return notification.error("Baholash noto'g'ri kiritildi");
    }

    closeModal();

    notification.promise(
      commentService.createComment(productId, formData).catch(() => {
        localStorage.setItem("comment", JSON.stringify(formData));
      }),
      {
        success: "Sharh qoldirildi!",
        loading: "Sharh qoldirilmoqda...",
        error: "Sharh qoldirishda xatolik yuz berdi!",
      }
    );
  };

  // Maps
  const contentMap = {
    contact: <ContactModalContent />,
    callOrder: <CallOrderModalContent updateFormData={setFormData} />,
    createStream: <CreateStreamModalContent updateFormData={setFormData} />,
    createComment: <CreateCommentModalContent updateFormData={setFormData} />,
  };

  const actionMap = {
    createStream,
    createComment,
    callOrder: sendUserCallOrderToServer,
  };

  // Render modal content
  const renderModalContent = () => {
    return contentMap[name] || "Ma'lumotlar mavjud emas!";
  };

  // Handle primary button click
  const handleAction = () => {
    if (actionMap[name]) actionMap[name]();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-20 size-full xs:p-3.5">
      <div className="flex items-end max-w-lg size-full xs:items-center">
        <div className="modal-content-container-inner flex flex-col justify-end max-h-full w-full animate-up xs:justify-center">
          {/* Modal header */}
          <div className="flex items-center justify-between z-30 h-14 bg-gray-light rounded-t-2xl border-b border-neutral-200 xs:rounded-t-3xl">
            <div className="size-12 shrink-0"></div>
            <b className="text-lg font-medium truncate xs:text-xl">{title}</b>
            <button
              onClick={closeModal}
              className="shrink-0 p-2.5"
              title="Close modal"
              aria-label="Close modal"
            >
              <Icon
                size={28}
                src={crossIcon}
                alt="Cross icon"
                className="size-7"
              />
            </button>
          </div>

          {/* Modal main content */}
          <div className="modal-main-content z-30 bg-white overflow-y-auto scroll-y-primary p-3.5 xs:p-4">
            {renderModalContent()}
          </div>

          {/* Modal buttons */}
          <div className="flex items-center gap-2 z-30 shrink-0 h-[60px] px-3.5 bg-gray-light border-t border-neutral-200 xs:rounded-b-3xl xs:px-4">
            {buttons?.primary && (
              <button
                disabled={isLoading}
                onClick={handleAction}
                className="btn-primary w-full h-11 rounded-xl font-normal xs:font-medium"
              >
                <LoadingText loader={isLoading} text={buttons.primary.label} />
              </button>
            )}

            {buttons?.secondary && (
              <button
                type="button"
                onClick={closeModal}
                className="btn bg-neutral-200 w-full h-11 rounded-xl font-normal xs:font-medium hover:bg-white"
              >
                {buttons.secondary.label}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <Overlay onClick={closeModal} className="z-20 animate-smooth-opening" />
    </div>
  );
};

export default Modal;
