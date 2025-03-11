import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Toaster (For notification)
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import News from "./pages/News";
import Users from "./pages/Users";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import Streams from "./pages/Streams";
import Workers from "./pages/Workers";
import Products from "./pages/Products";
import Comments from "./pages/Comments";
import Settings from "./pages/Settings";
import Payments from "./pages/Payments";
import Contests from "./pages/Contests";
import CreateBlog from "./pages/CreateBlog";
import CreateNews from "./pages/CreateNews";
import EditProduct from "./pages/EditProduct";
import DonationBox from "./pages/DonationBox";
import CreateWorker from "./pages/CreateWorker";
import GetOrderById from "./pages/GetOrderById";
import CreateProduct from "./pages/CreateProduct";
import DistributionOrders from "./pages/DistributionOrders";
import SearchUser from "./pages/SearchUser";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Page404 />} />
          <Route path="news" element={<News />} />
          <Route path="users" element={<Users />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="streams" element={<Streams />} />
          <Route path="profile" element={<Profile />} />
          <Route path="comments" element={<Comments />} />
          <Route path="payments" element={<Payments />} />
          <Route path="products" element={<Products />} />
          <Route path="contests" element={<Contests />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users/workers" element={<Workers />} />
          <Route path="news/create" element={<CreateNews />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="donation-box" element={<DonationBox />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="users/search/:userId?" element={<SearchUser />} />
          <Route path="users/create-worker" element={<CreateWorker />} />
          <Route path="products/edit/:productId" element={<EditProduct />} />
          <Route path="orders/distribution" element={<DistributionOrders />} />
          <Route
            element={<GetOrderById />}
            path="orders/get-order-by-id/:orderId?"
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      {/* Router */}
      <RouterProvider router={router} />

      {/* Toaster */}
      <Toaster />
    </>
  );
};

export default App;
