import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidbar from "../sence/global/Sidbar";
import Comands from "../sence/comandmanagment/Comands";
import Dashboard from "../sence/dashboard/Dashboard";
import Product from "../sence/product/Product";
import Delivery from "../sence/delivery/Delivery";
import Client from "../sence/clinet/Client";
import Authontification from "../sence/autontification/Authontification";

export default function Routes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Route />,
      children: [
        {
          path: "/comands",
          element: <Comands />,
        },
        {
          path:'/dashboard',
          element:<Dashboard/>
        },
        {
          path:'/product',
          element:<Product/>
        },
        {
          path:'delivery',
          element:<Delivery/>
        },
        {
          path:'clients',
          element:<Client/>
        },
        {
          path:'/logout',
          element:<Authontification/>
        }
      ],
    },
  ]);
  function Route() {
    return (
      <div>
        <Sidbar />
        <Outlet />
      </div>
    );
  }
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}
