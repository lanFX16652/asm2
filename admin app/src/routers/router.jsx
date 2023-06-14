import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Hotel from "../components/Hotel/Hotel";
import NewHotel from "../components/Hotel/NewHotel";
import Room from "../components/Hotel/Room";
import NewRoom from "../components/Hotel/NewRoom";
import Transaction from "../components/Transaction/Transaction";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <Layout />
      </AuthWrapper>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "hotel/list",
        element: <Hotel />,
      },
      {
        path: "hotel/create",
        element: <NewHotel />,
      },
      {
        path: "room/list",
        element: <Room />,
      },
      {
        path: "room/create",
        element: <NewRoom />,
      },
      {
        path: "transaction/list",
        element: <Transaction />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthWrapper>
        <Login />
      </AuthWrapper>
    ),
  },
  
]);
