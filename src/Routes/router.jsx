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
import MyProductUpdate from "../Pages/MyProductUpdate/MyProductUpdate";
import ReviewQueue from "../Pages/Dashboard/ModeratorSlot/ReviewQueue/ReviewQueue";
import ReportedContents from "../Pages/Dashboard/ModeratorSlot/ReportedContents/ReportedContents";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import StatisticsPage from "../Pages/Dashboard/AdminSlot/StatisticsPage/StatisticsPage";
import ManageUsers from "../Pages/Dashboard/AdminSlot/ManageUsers/ManageUsers";
import ManageCoupons from "../Pages/Dashboard/AdminSlot/ManageCoupons/ManageCoupons";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";


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
      },
      {
        path: 'my-product-update/:id',
        element: <MyProductUpdate></MyProductUpdate>
      },
      {
        path: 'product-details/:id',
        element: <PrivateRoute><ProductDetail></ProductDetail></PrivateRoute>
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

      // -------------User routes--------------
      {
        path: "my-profile",
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>,
      },
      {
        path: "add-product",
        element: <PrivateRoute>
          <AddProducts></AddProducts>
        </PrivateRoute>
      },
      {
        path: "my-product",
        element: <PrivateRoute>
          <MyProducts></MyProducts>
        </PrivateRoute>,
      },

      // -----------moderator routes-----------------
      {
        path: 'review-queue',
        element: <PrivateRoute>
          <ModeratorRoute>
            <ReviewQueue></ReviewQueue>
          </ModeratorRoute>
        </PrivateRoute>
      },
      {
        path: 'reported-contents',
        element: <PrivateRoute>
          <ModeratorRoute>
            <ReportedContents></ReportedContents>
          </ModeratorRoute>
        </PrivateRoute>
      },

      // -------------Admin routes-------------------
      {
        path: 'statistic',
        element: <PrivateRoute>
          <AdminRoute>
            <StatisticsPage></StatisticsPage>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'manage-coupons',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageCoupons></ManageCoupons>
          </AdminRoute>
        </PrivateRoute>
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