import React, { useState } from "react";

// Wave component
import Wave from "react-wavify";

// Api config
import api from "@/api/axiosConfig";

// Components
import Icon from "@/components/Icon";

// Utils
import { extractIdFromUrl } from "@/utils";

// Endpoints
import apiEndpoints from "@/api/apiEndpoints";

// Toaster (For notification)
import { notification } from "@/notification";

// Images
import crossIcon from "@/assets/images/icons/cross-circle.svg";

const UploadImageBox = ({
  endpoint,
  disabled,
  onUploadImage,
  className = "",
  multiple = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(-10);
  const [deletingImageIndexes, setDeletingImageIndexes] = useState([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (disabled || isLoading || files?.length <= 0) return;

    setIsLoading(true);
    let maxProgress = 0;
    setUploadProgress(0);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append("files", files[i]);

    api
      .post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded / e.total) * 100);

          // Update progress
          if (progress === 100) {
            setUploadProgress(maxProgress);
          } else {
            maxProgress = progress;
            setUploadProgress(progress);
          }
        },
      })
      .then((res) => {
        const newImages = [...uploadedImages, ...res.files];

        onUploadImage(newImages);
        setUploadedImages(newImages);
      })
      .catch(() => notification.error("Rasm yuklashda xatolik yuz berdi!"))
      .finally(() => {
        setIsLoading(false);
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(-10), 2000);
      });
  };

  const handleDeleteImage = (url, index) => {
    if (index === deletingImageIndexes || true) return;
    const imageId = extractIdFromUrl("products", url);
    if (!imageId) return notification.error("Rasmning ID raqami xato");

    // Update deleting images
    setDeletingImageIndexes((prev) => [...prev, index]);

    // Delete image from the server
    api
      .delete(apiEndpoints.deleteImage(imageId))
      .then(() => {
        notification.success("Rasm muvaffaqiyatli o'chirildi");
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
      })
      .catch(() => notification.error("Rasmni o'chirishda xatolik yuz berdi"))
      .finally(() => {
        setDeletingImageIndexes((prev) => prev.filter((i) => i !== index));
      });
  };

  return (
    <div className={`${className} w-full space-y-5`}>
      <label
        className={`${
          isLoading ? "" : "cursor-pointer"
        } flex items-center justify-center relative overflow-hidden bg-white/70 w-full h-96 border-2 border-dashed border-primary-default rounded-xl transition-colors duration-200 hover:bg-white sm:text-lg`}
      >
        {/* Text */}
        <span className="z-10">
          {uploadProgress >= 0 && uploadProgress < 100
            ? `Rasm yuklanmoqda ${uploadProgress}%`
            : ""}

          {uploadProgress < 0 ? "Rasm yuklash" : ""}
          {uploadProgress === 100 ? "Rasm yuklandi" : ""}
        </span>

        {/* File input */}
        <input
          type="file"
          className="hidden"
          multiple={multiple}
          disabled={isLoading || disabled}
          onChange={handleFileInputChange}
          accept="image/jpg, image/jpeg, image/png"
        />

        <Wave
          paused={false}
          fill="#0084ff1a"
          style={{ height: `${uploadProgress + 10}%` }}
          options={{ points: 2, speed: 0.3, height: 25, amplitude: 25 }}
          className="absolute inset-x-0 bottom-0 transition-[height] duration-500 h-60"
        />
      </label>

      {/* Images */}
      {uploadedImages?.length > 0 && (
        <div className="flex flex-wrap gap-5 justify-center">
          {uploadedImages.map((image, index) => {
            return (
              <div
                key={index}
                className={`${
                  deletingImageIndexes.includes(index) ? "animate-pulse" : ""
                } relative size-14`}
              >
                {/* Image */}
                <Icon
                  size={56}
                  src={image.small}
                  alt="Uploaded image"
                  className="size-full object-contain bg-neutral-300 rounded"
                />

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteImage(image, index)}
                  disabled={deletingImageIndexes.includes(index)}
                  className="absolute p-1 -top-3 -right-3 transition-colors duration-200 disabled:opacity-30"
                >
                  <Icon src={crossIcon} alt="Cross icon" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UploadImageBox;
