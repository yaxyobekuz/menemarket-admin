import React, { useEffect, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import DotsLoader from "@/components/DotsLoader";
import ProductItem from "@/components/ProductItem";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Services
import productService from "@/api/services/productService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "@/store/features/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allProducts = useSelector((state) => state.products.data);
  const [filteredProducts, setFilteredProducts] = useState(allProducts || []);

  const handleDeleteProduct = (id) => {
    notification.promise(
      productService.deleteProduct(id).then(() => {
        setFilteredProducts((products) =>
          products.filter(({ _id }) => _id !== id)
        );
      }),
      {
        loading: "Mahsulot o'chirilmoqda...",
        success: "Mahsulot muvaffaqiyatli o'chirildi!",
        error: "Mahsulot o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadProducts = () => {
    setHasError(false);
    setIsLoading(true);

    productService
      .getProducts()
      .then((products) => {
        setFilteredProducts(products);
        dispatch(updateProducts(products));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allProducts?.length === 0) loadProducts();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Mahsulotlar</h1>

      {/* Nav tabs */}
      <Tabs name="products" />

      {/* Comments */}
      {!isLoading && !hasError && filteredProducts?.length >= 0 && (
        <ul className="grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8">
          {filteredProducts.map((product) => (
            <ProductItem
              data={product}
              key={product?._id}
              deleteProduct={handleDeleteProduct}
            />
          ))}
        </ul>
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
            onClick={loadProducts}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
