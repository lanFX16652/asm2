import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Hotel from "../components/Hotel/Hotel";
import NewHotel from "../components/Hotel/NewHotel";
import Room from "../components/Hotel/Room";
import NewRoom from "../components/Hotel/NewRoom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        element: <Room/>
      },
      {
        path: "room/create",
        element: <NewRoom />,
      },
    ],
  },
]);
