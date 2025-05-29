import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Error from "../components/Error/Error";
import Register from "../Pages/Autentication/Register";
import Login from "../Pages/Autentication/Login";
import DashboardLayouts from "../layouts/DashboardLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error/>,
    children:[
        {
           path: '/',
            element: <Home></Home>
        }
    ]
  },
   {
    path: "dashboard",
    element: (
      
        <DashboardLayouts></DashboardLayouts>
     
    ),

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