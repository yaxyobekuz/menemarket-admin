import React, { useCallback, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Api endpoints
import apiEndpoints from "@/api/apiEndpoints";

// Services
import newsService from "@/api/services/newsService";

// Components
import Tabs from "@/components/Tabs";
import LoadingText from "@/components/LoadingText";
import PageMessage from "@/components/PageMessage";
import UploadImageBox from "@/components/UploadImageBox";
import FormInputWrapper from "@/components/FormInputWrapper";

// Stickers
import likeOutSticker from "../assets/stickers/like-out.json";

const CreateNews = () => {
  const [formData, setFormData] = useState({});
  const [isCrated, setIsCrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  // Submit form
  const handleCreateNews = (e) => {
    e.preventDefault();

    if (isLoading) return;

    // Check form data
    if (Object.values(formData).length !== 3) {
      return notification.error("Ma'lumotlar to'g'ri kiritilmagan");
    }
    // Add loader
    setIsLoading(true);

    // Send request to create product
    newsService
      .createNews(formData)
      .then(() => {
        setFormData({});
        setIsCrated(true);
        setTimeout(() => setIsCrated(false), 5000);
      })
      .catch(() => notification.error("Yangilikni yaratishda xatolik"))
      .finally(() => setIsLoading(false));
  };

  return isCrated ? (
    <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <PageMessage title="Yangilik yaratildi!" sticker={likeOutSticker} />
    </div>
  ) : (
    <div className="container py-6 space-y-7">
      <h1>Yangilik yaratish</h1>

      {/* Nav tabs */}
      <Tabs name="news" />

      <div className="flex flex-col gap-5 w-full lg:flex-row">
        {/* Upload images */}
        <UploadImageBox
          multiple={false}
          disabled={isLoading}
          endpoint={apiEndpoints.uploadImage}
          className="top-20 max-h-max lg:sticky"
          onUploadImage={(value) => handleInputChange("banner", value[0])}
        />

        {/* Form */}
        <form onSubmit={handleCreateNews} className="w-full space-y-5">
          {/* Name */}
          <FormInputWrapper
            required
            name="title"
            label="Nom *"
            disabled={isLoading}
            placeholder="Mahsulotni qanday tanlash kerak..."
            onChange={(value) => handleInputChange("title", value)}
          />

          {/* Description */}
          <FormInputWrapper
            required
            as="textarea"
            label="Izoh *"
            name="description"
            disabled={isLoading}
            placeholder="Mahsulot juda ham ajoyib..."
            onChange={(value) => handleInputChange("desc", value)}
          />

          {/* Submit btn */}
          <button
            disabled={isLoading}
            className="btn-primary w-full h-11 xs:w-56"
          >
            <LoadingText text="Yaratish" loader={isLoading} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
