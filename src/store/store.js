import { configureStore } from "@reduxjs/toolkit";

// Features
import userSlice from "./features/userSlice";
import newsSlice from "./features/newsSlice";
import blogSlice from "./features/blogSlice";
import usersSlice from "./features/usersSlice";
import modalSlice from "./features/modalSlice";
import streamsSlice from "./features/streamsSlice";
import productsSlice from "./features/productsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
    blogs: blogSlice,
    users: usersSlice,
    modal: modalSlice,
    streams: streamsSlice,
    products: productsSlice,
  },
});
