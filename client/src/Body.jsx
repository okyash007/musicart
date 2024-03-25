import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Onboard from "./pages/onboard/Onboard";
import Signup from "./pages/onboard/login-signup/Signup";
import Login from "./pages/onboard/login-signup/Login";
import Landing from "./pages/home/landing/Landing";
import ProductDetails from "./pages/home/product-details/ProductDetails";
import { makeGetRequest } from "./api/makeGetRequest";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";
import { setItems } from "./store/cartSlice";
import Cart from "./pages/home/cart/Cart";
import Checkout from "./pages/home/checkout/Checkout";
import Invoices from "./pages/home/all-invoice/Invoices";
import Invoice from "./pages/home/invoice/Invoice";
import { backendUrl } from "./utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user.data);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: user ? <Cart /> : <Navigate to={"/"} />,
        },
        {
          path: "/checkout",
          element: user ? <Checkout /> : <Navigate to={"/"} />,
        },
        {
          path: "/invoice",
          element: user ? <Invoices /> : <Navigate to={"/"} />,
        },
        {
          path: "/invoice/:id",
          element: user ? <Invoice /> : <Navigate to={"/"} />,
        },
      ],
    },
    {
      path: "/signup",
      element: user ? (
        <Navigate to={"/"} />
      ) : (
        <Onboard>
          <Signup />
        </Onboard>
      ),
    },
    {
      path: "/login",
      element: user ? (
        <Navigate to={"/"} />
      ) : (
        <Onboard>
          <Login />
        </Onboard>
      ),
    },
  ]);

  async function auth() {
    const data = await makeGetRequest(`${backendUrl}/api/v1/user/auth`);

    if (data.success === true) {
      setLoading(false);
      const { name, email, phone, ...rest } = data.data;
      dispatch(setUser({ name, email, phone }));
      if (rest.cart) {
        dispatch(setItems({ items: rest.cart.items, id: rest.cart._id }));
      } else {
        dispatch(setItems({ items: [], id: null }));
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("acess-token")) {
      auth();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return <RouterProvider router={appRouter} />;
};

export default Body;
