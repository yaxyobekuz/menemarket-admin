import React, { useEffect, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import NewsItem from "@/components/NewsItem";
import DotsLoader from "@/components/DotsLoader";

// Services
import newsService from "@/api/services/newsService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateNews } from "@/store/features/newsSlice";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

const News = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allNews = useSelector((state) => state.news.data);
  const [filteredNews, setFilteredNews] = useState(allNews || []);

  const handleDeleteNews = (id) => {
    notification.promise(
      newsService.deleteNews(id).then(() => {
        setFilteredNews((news) => news.filter(({ _id }) => _id !== id));
      }),
      {
        loading: "Yangilik o'chirilmoqda...",
        success: "Yangilik muvaffaqiyatli o'chirildi!",
        error: "Yangilikni o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadNews = () => {
    setHasError(false);
    setIsLoading(true);

    newsService
      .getNews()
      .then((news) => {
        setFilteredNews(news);
        dispatch(updateNews(news));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allNews?.length === 0) loadNews();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Yangiliklar</h1>

      {/* Nav tabs */}
      <Tabs name="news" />

      {/* News */}
      {!isLoading && !hasError && filteredNews?.length >= 0 && (
        <ul className="grid grid-cols-6 gap-5">
          {filteredNews.map((news) => (
            <NewsItem
              data={news}
              key={news?._id}
              deleteNews={handleDeleteNews}
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
            onClick={loadNews}
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

export default News;
