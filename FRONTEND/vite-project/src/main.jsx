import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Product from './Components/Product.jsx';
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "react-auth-kit";
import DashBoard from './DashBoard.jsx';
import Add from './Components/AddProduct.jsx';
import Delete from './Components/AddProduct.jsx';
import AdminPage from './Components/AddProduct.jsx';
import Orders from './Components/Orders.jsx';
import Cart from './Components/Cart.jsx';
import User from './Components/User.jsx';
import Table from './Components/Table.jsx';
// import User from './Components/User.jsx'
import Success from './Components/payment/Success.jsx';
import Cancel from './Components/payment/Cancel.jsx';


const queryClient = new QueryClient();



const router = createBrowserRouter([

  {
    path: "/",
    element: <DashBoard />,
    children: [
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/adminpage",
        element: <AdminPage />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/carts",
        element: <Cart />,
      },
      {
        path: "/table",
        element: <Table />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },



    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);