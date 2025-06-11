import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Assets from "./pages/Assets";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Transactions from "./pages/Transactions";
import StockDetail from "./pages/StockDetail";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/stock/:stockId",
    element: <StockDetail />,
  },
  {
    path: "/assets",
    element: <Assets />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

const Router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

export default Router;
