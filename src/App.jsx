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
import Products from "./pages/Products";
import Comments from "./pages/Comments";
import CreateWorker from "./pages/CreateWorker";

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
          <Route path="products" element={<Products />} />
          <Route path="users/create-worker" element={<CreateWorker />} />
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
