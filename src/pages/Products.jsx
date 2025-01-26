import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
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
    if (allProducts?.length === 0) {
      loadProducts();
    } else {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  return (
    <div className="container py-6 space-y-6">
      <h1>Mahsulotlar</h1>

      {/* Nav tabs */}
      <nav className="products-layout-tabs">
        <ul className="flex gap-1 max-w-max bg-white p-1 rounded-xl">
          {/* Main */}
          <li>
            <NavLink
              end
              to="/products"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Asosiy
            </NavLink>
          </li>

          {/* Product */}
          <li>
            <NavLink
              to="/products/new-product"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Yaratish
            </NavLink>
          </li>

          {/* Search */}
          <li>
            <NavLink
              to="/products/search"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Qidirish
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Products */}
      {!isLoading && !hasError && filteredProducts?.length >= 0 && (
        <ul className="grid grid-cols-8 gap-5">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              data={product}
              handleDeleteProduct={handleDeleteProduct}
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
