import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Error from "../components/Error/Error";
import Register from "../Pages/Autentication/Register";
import Login from "../Pages/Autentication/Login";
import DashboardLayouts from "../layouts/DashboardLayouts";
import PrivateRoute from "./PrivateRoute";

import MyProfile from "../Pages/Dashboard/UserSlot/MyProfile";
import MyProducts from "../Pages/Dashboard/UserSlot/MyProducts";
import AddProducts from "../Pages/Dashboard/UserSlot/AddProducts/AddProducts";
import Products from "../Pages/Products/Products";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'products',
        element: <Products></Products>,
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/all-product-count`),
      }
    ]
  },
  {
    path: "dashboard",
    element: (

      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>

    ),
    children: [
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "add-product",
        element: <AddProducts></AddProducts>
      },
      {
        path: "my-product",
        element: <MyProducts></MyProducts>,
      },
    ],
  },
  {
    path: 'register',
    element: <Register></Register>
  },
  {
    path: 'login',
    element: <Login></Login>
  }
]);

export default router