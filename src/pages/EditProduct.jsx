import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Data
import categories from "@/data/categories";

// Toaster (For notification)
import { notification } from "@/notification";

// Api endpoints
import apiEndpoints from "@/api/apiEndpoints";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Services
import productService from "@/api/services/productService";

// Components
import Tabs from "@/components/Tabs";
import DotsLoader from "@/components/DotsLoader";
import LoadingText from "@/components/LoadingText";
import UploadImageBox from "@/components/UploadImageBox";
import FormInputWrapper from "@/components/FormInputWrapper";

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    tags,
    type,
    price,
    title,
    images,
    total: count,
    ads_post: adsPost,
    desc: description,
    for_seller: bonusPrice,
    discount_price: discountPrice,
  } = product || {};

  // Load products
  const loadProduct = () => {
    const validId = productId?.length > 16;

    if (!validId) {
      setHasError(true);
      setIsLoading(false);
      setTimeout(() => notification.error("Mahsulot topilmadi"), 0);
      return;
    }

    setHasError(false);
    setIsLoading(true);

    productService
      .getProduct(productId)
      .then(({ product }) => {
        setProduct(product);
        setFormData(product);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  // Submit form
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const { tags } = formData || {};
    if (isUpdating || isUploading) return;

    // Check images length
    if (!formData?.images?.length || formData?.images?.length === 0) {
      return notification.error("Hech qanday rasm yuklanmagan");
    }

    // Format tags
    const formatTags = (tags) => {
      if (typeof tags === "string") {
        const formattedTags = tags
          ?.split(",")
          ?.map((tag) => tag?.trim()?.toLowerCase()?.replaceAll(" ", "-"))
          ?.filter((tag) => tag?.length > 2);
        return formattedTags;
      } else return tags;
    };

    // Add loader
    setIsUpdating(true);

    // New formatted form data
    const formattedFormData = { ...formData, tags: formatTags(tags) };

    // Send request to create product
    productService
      .updateProduct(productId, formattedFormData)
      .then(() => notification.success("Mahsulot muvaffaqiyatli yangilandi"))
      .catch(() => notification.error("Mahsulotni yangilashda xatolik"))
      .finally(() => setIsUpdating(false));
  };

  useEffect(() => {
    if (product?._id !== productId) loadProduct();
    else {
      setTimeout(() => {
        setHasError(false);
        setIsLoading(false);
      }, 500);
    }
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Mahsulotni tahrirlash</h1>

      {/* Nav tabs */}
      <Tabs name="products" />

      {/* Product */}
      {!isLoading && !hasError && product && (
        <div className="flex flex-col gap-5 w-full lg:flex-row">
          {/* Upload images */}
          <UploadImageBox
            disabled={isUpdating}
            initialImages={images}
            onLoad={setIsUploading}
            className="top-20 max-h-max lg:sticky"
            endpoint={apiEndpoints.uploadProductImage}
            onUploadImage={(value) => handleInputChange("images", value)}
          />

          {/* Form */}
          <form onSubmit={handleUpdateProduct} className="w-full space-y-5">
            {/* Name */}
            <FormInputWrapper
              required
              name="name"
              label="Nom *"
              defaultValue={title}
              disabled={isUpdating}
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
                defaultValue={type}
                disabled={isUpdating}
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
              disabled={isUpdating}
              defaultValue={count}
              onChange={(value) => handleInputChange("total", value)}
            />

            {/* Price */}
            <FormInputWrapper
              required
              name="price"
              type="number"
              label="Asl narx *"
              placeholder="99,000"
              defaultValue={price}
              disabled={isUpdating}
              onChange={(value) => handleInputChange("price", value)}
            />

            {/* Discount price */}
            <FormInputWrapper
              required
              type="number"
              disabled={isUpdating}
              name="discount-price"
              placeholder="149,000"
              label="Chegirma narx *"
              defaultValue={discountPrice}
              onChange={(value) => handleInputChange("discount_price", value)}
            />

            {/* Price for seller */}
            <FormInputWrapper
              required
              type="number"
              placeholder="30,000"
              disabled={isUpdating}
              name="price-for-seller"
              defaultValue={bonusPrice}
              label="Sotuvchi uchun narx *"
              onChange={(value) => handleInputChange("for_seller", value)}
            />

            {/* Ads post */}
            <FormInputWrapper
              required
              type="url"
              name="ads-post"
              disabled={isUpdating}
              defaultValue={adsPost}
              label="Reklama posti *"
              placeholder="https://t.me/..."
              onChange={(value) => handleInputChange("ads_post", value)}
            />

            {/* Tags */}
            <FormInputWrapper
              required
              name="tags"
              label="Teglar *"
              disabled={isUpdating}
              defaultValue={tags?.join(", ")}
              placeholder="Bolalar uchun, O'yinchoq..."
              onChange={(value) => handleInputChange("tags", value)}
            />

            {/* Description */}
            <FormInputWrapper
              required
              as="textarea"
              label="Izoh *"
              name="description"
              disabled={isUpdating}
              defaultValue={description}
              placeholder="Mahsulot juda ham ajoyib..."
              onChange={(value) => handleInputChange("desc", value)}
            />

            {/* Submit btn */}
            <button
              disabled={isUpdating || isUploading}
              className="btn-primary w-full h-11 xs:w-56"
            >
              <LoadingText text="Tahrirlash" loader={isUpdating} />
            </button>
          </form>
        </div>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader
          color="#0085FF"
          className="flex justify-center fixed top-1/2 inset-x-0 w-full"
        />
      )}

      {/* Reload button */}
      {hasError && !isLoading && (
        <div className="flex justify-center fixed top-[calc(50%-20px)] inset-x-0">
          <button
            title="Reload"
            aria-label="Reload"
            onClick={loadProduct}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
