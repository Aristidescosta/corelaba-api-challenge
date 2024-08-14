import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";

import { Home } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  );
};
