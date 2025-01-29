import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
import BlogsItem from "@/components/NewsItem";
import DotsLoader from "@/components/DotsLoader";

// Services
import blogsService from "@/api/services/blogsService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateBlogs } from "@/store/features/blogsSlice";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

const Blogs = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allBlogs = useSelector((state) => state.blogs.data);
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs || []);

  const handleDeleteBlogs = (id) => {
    notification.promise(
      blogsService.deleteBlogs(id).then(() => {
        setFilteredBlogs((blogs) => blogs.filter(({ _id }) => _id !== id));
      }),
      {
        loading: "Yangilik o'chirilmoqda...",
        success: "Yangilik muvaffaqiyatli o'chirildi!",
        error: "Yangilikni o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadBlogs = () => {
    setHasError(false);
    setIsLoading(true);

    blogsService
      .getBlogs()
      .then((blogs) => {
        setFilteredBlogs(blogs);
        dispatch(updateBlogs(blogs));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allBlogs?.length === 0) loadBlogs();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Bloglar</h1>

      {/* Nav tabs */}
      <nav className="products-layout-tabs">
        <ul className="flex gap-1 max-w-max bg-white p-1 rounded-xl">
          {/* Main */}
          <li>
            <NavLink
              end
              to="/blogs"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Asosiy
            </NavLink>
          </li>

          {/* Product */}
          <li>
            <NavLink
              to="/blogs/new"
              className="inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200 hover:bg-gray-light/50"
            >
              Yaratish
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Blogs */}
      {!isLoading && !hasError && filteredBlogs?.length >= 0 && (
        <ul className="grid grid-cols-6 gap-5">
          {filteredBlogs.map((blogs) => (
            <BlogsItem
              data={blogs}
              key={blogs?._id}
              deleteNews={handleDeleteBlogs}
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
            onClick={loadBlogs}
            aria-label="Reload"
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
