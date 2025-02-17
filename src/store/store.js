import { configureStore } from "@reduxjs/toolkit";

// Features
import userSlice from "./features/userSlice";
import newsSlice from "./features/newsSlice";
import blogsSlice from "./features/blogsSlice";
import usersSlice from "./features/usersSlice";
import modalSlice from "./features/modalSlice";
import ordersSlice from "./features/ordersSlice";
import streamsSlice from "./features/streamsSlice";
import donatesSlice from "./features/donatesSlice";
import productsSlice from "./features/productsSlice";
import commentsSlice from "./features/commentsSlice";
import paymentsSlice from "./features/paymentsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
    blogs: blogsSlice,
    users: usersSlice,
    modal: modalSlice,
    orders: ordersSlice,
    streams: streamsSlice,
    donates: donatesSlice,
    payments: paymentsSlice,
    products: productsSlice,
    comments: commentsSlice,
  },
});
