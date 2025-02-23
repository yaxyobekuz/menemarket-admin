import React, { useEffect, useState } from "react";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import DotsLoader from "@/components/DotsLoader";
import ButtonTabs from "@/components/ButtonTabs";
import CommentItem from "@/components/CommentItem";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Services
import commentsService from "@/api/services/commentsService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateComments } from "@/store/features/commentsSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allComments = useSelector((state) => state.comments.data);
  const [filteredComments, setFilteredComments] = useState(allComments || []);

  const handleDeleteComment = (id) => {
    notification.promise(
      commentsService.deleteComment(id).then(() => {
        if (filteredComments.find(({ _id }) => _id === id)) {
          setFilteredComments((comments) =>
            comments.filter(({ _id }) => _id !== id)
          );
        }
      }),
      {
        loading: "Izoh o'chirilmoqda...",
        success: "Izoh muvaffaqiyatli o'chirildi!",
        error: "Izohni o'chirishda xatolik yuz berdi!",
      }
    );
  };

  const loadComments = () => {
    setHasError(false);
    setIsLoading(true);

    commentsService
      .getComments()
      .then((comments) => {
        setFilteredComments(comments);
        dispatch(updateComments(comments));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const filterCommentsByRating = (value) => {
    if (!value) return setFilteredComments(allComments);
    const filtered = allComments.filter(({ rating }) => rating === value);
    setFilteredComments(filtered);
  };

  useEffect(() => {
    if (allComments?.length === 0) loadComments();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>
        <span>Izohlar</span>
        <span className="text-neutral-400"> ({allComments?.length || 0})</span>
      </h1>

      {/* Nav tabs */}
      <div className="flex flex-wrap justify-between gap-5 w-full">
        <Tabs name="comments" />

        {/* Filter comments by rating */}
        <ButtonTabs
          disabled={isLoading || hasError}
          onChange={filterCommentsByRating}
          data={Array.from({ length: 5 }).map((_, index) => {
            const rating = index + 1;
            return { value: rating, label: rating };
          })}
        />
      </div>

      {/* Comments */}
      {!isLoading && !hasError && filteredComments?.length >= 0 && (
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredComments.map((comment, index) => (
            <CommentItem
              key={index}
              data={comment}
              deleteComment={handleDeleteComment}
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
            onClick={loadComments}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
