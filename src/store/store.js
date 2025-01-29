import { configureStore } from "@reduxjs/toolkit";

// Features
import userSlice from "./features/userSlice";
import newsSlice from "./features/newsSlice";
import blogsSlice from "./features/blogsSlice";
import usersSlice from "./features/usersSlice";
import modalSlice from "./features/modalSlice";
import ordersSlice from "./features/ordersSlice";
import streamsSlice from "./features/streamsSlice";
import productsSlice from "./features/productsSlice";
import commentsSlice from "./features/commentsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
    blogs: blogsSlice,
    users: usersSlice,
    modal: modalSlice,
    orders: ordersSlice,
    streams: streamsSlice,
    products: productsSlice,
    comments: commentsSlice,
  },
});
