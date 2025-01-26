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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* For user */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
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
