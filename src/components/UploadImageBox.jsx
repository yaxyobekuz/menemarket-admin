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
  onLoad = () => {},
  initialImages = [],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deletingImages, setDeletingImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(-10);
  const [uploadedImages, setUploadedImages] = useState(initialImages);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (disabled || isLoading || files?.length <= 0) return;

    onLoad(true);
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
        onLoad(false);
        setIsLoading(false);
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(-10), 2000);
      });
  };

  const handleDeleteImage = (id) => {
    if (id === deletingImages || true) return;
    const image = uploadedImages.find(({ id: _ }) => _ === id);
    if (image) return notification.error("Rasmning ID raqami xato");

    let imageIdArray = [];

    Object.values(image).forEach((url) => {
      const imageId = extractIdFromUrl(url);
      if (imageId) imageIdArray.push(imageId);
    });

    // Form data
    const formData = { keys: imageIdArray };

    // Update deleting images
    setDeletingImages((prev) => [...prev, id]);

    // Delete image from the server
    api
      .delete(apiEndpoints.deleteImage, formData)
      .then(() => {
        notification.success("Rasm muvaffaqiyatli o'chirildi");
        setUploadedImages((prev) => prev.filter((_) => _ !== id));
      })
      .catch(() => notification.error("Rasmni o'chirishda xatolik yuz berdi"))
      .finally(() => setDeletingImages((prev) => prev.filter((i) => i !== id)));
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
          {uploadedImages.map(({ _id: id, small: image }) => {
            return (
              <div
                key={id}
                className={`${
                  deletingImages.includes(id) ? "animate-pulse" : ""
                } relative size-14`}
              >
                {/* Image */}
                <Icon
                  size={56}
                  src={image}
                  alt="Uploaded image"
                  className="size-full object-contain bg-neutral-300 rounded"
                />

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteImage(id)}
                  disabled={deletingImages.includes(id)}
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
