import React, { useCallback, useState } from "react";

// Data
import categories from "@/data/categories";

// Toaster (For notification)
import { notification } from "@/notification";

// Api endpoints
import apiEndpoints from "@/api/apiEndpoints";

// Services
import productService from "@/api/services/productService";

// Components
import Tabs from "@/components/Tabs";
import LoadingText from "@/components/LoadingText";
import PageMessage from "@/components/PageMessage";
import UploadImageBox from "@/components/UploadImageBox";
import FormInputWrapper from "@/components/FormInputWrapper";

// Stickers
import likeOutSticker from "../assets/stickers/like-out.json";

const CreateProduct = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ type: categories[0].name });

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  // Submit form
  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (isLoading) return;

    // Check form data
    if (
      Object.values(formData).length !== 9 ||
      !formData?.images?.length ||
      formData?.images?.length === 0
    ) {
      return notification.error("Ma'lumotlar to'g'ri kiritilmagan");
    }

    // Format tags
    const formattedTags = formData?.tags
      ?.split(",")
      ?.map((tag) => tag?.trim()?.toLowerCase()?.replaceAll(" ", "-"))
      ?.filter((tag) => tag?.length > 2);

    // New formatted form data
    const formattedFormData = {
      ...formData,
      tags: formattedTags,
    };

    // Add loader
    setIsLoading(true);

    // Send request to create product
    productService
      .createProduct(formattedFormData)
      .then(() => {
        setIsCreated(true);
        setFormData({ type: categories[0].name });
        setTimeout(() => setIsCreated(false), 5000);
      })
      .catch(() => notification.error("Mahsulotni yaratishda xatolik"))
      .finally(() => setIsLoading(false));
  };

  return isCreated ? (
    <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <PageMessage title="Mahsulot yaratildi!" sticker={likeOutSticker} />
    </div>
  ) : (
    <div className="container py-6 space-y-7">
      <h1>Mahsulot yaratish</h1>

      {/* Nav tabs */}
      <Tabs name="products" />

      <div className="flex flex-col gap-5 w-full lg:flex-row">
        {/* Upload images */}
        <UploadImageBox
          disabled={isLoading}
          className="top-20 max-h-max lg:sticky"
          endpoint={apiEndpoints.uploadProductImage}
          onUploadImage={(value) => handleInputChange("images", value)}
        />

        {/* Form */}
        <form onSubmit={handleCreateProduct} className="w-full space-y-5">
          {/* Name */}
          <FormInputWrapper
            required
            name="name"
            label="Nom *"
            disabled={isLoading}
            placeholder="O'yinchoq, Texnika..."
            onChange={(value) => handleInputChange("title", value)}
          />

          {/* Type */}
          <div className="group flex flex-col items-center justify-center gap-2 relative overflow-hidden w-full rounded-b-lg">
            {/* Label */}
            <div className="w-full">
              <label htmlFor="type" className="pl-1.5">
                Tur *
              </label>
            </div>

            {/* Select */}
            <select
              id="type"
              name="type"
              className="h-11 px-3.5"
              onChange={(e) => handleInputChange("type", e.target.value)}
            >
              {categories.map(({ name, label }, index) => (
                <option key={index} value={name}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Count */}
          <FormInputWrapper
            required
            name="count"
            type="number"
            label="Son *"
            placeholder="100"
            disabled={isLoading}
            onChange={(value) => handleInputChange("total", value)}
          />

          {/* Price */}
          <FormInputWrapper
            required
            name="price"
            type="number"
            label="Asl narx *"
            placeholder="99,000"
            disabled={isLoading}
            onChange={(value) => handleInputChange("price", value)}
          />

          {/* Discount price */}
          <FormInputWrapper
            required
            type="number"
            disabled={isLoading}
            name="discount-price"
            placeholder="149,000"
            label="Chegirma narx *"
            onChange={(value) => handleInputChange("discount_price", value)}
          />

          {/* Price for seller */}
          <FormInputWrapper
            required
            type="number"
            placeholder="30,000"
            disabled={isLoading}
            name="price-for-seller"
            label="Sotuvchi uchun narx *"
            onChange={(value) => handleInputChange("for_seller", value)}
          />

          {/* Tags */}
          <FormInputWrapper
            required
            name="tags"
            label="Teglar *"
            disabled={isLoading}
            placeholder="Bolalar uchun, O'yinchoq..."
            onChange={(value) => handleInputChange("tags", value)}
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

export default CreateProduct;
