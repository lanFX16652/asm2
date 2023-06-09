import express from "express";
import {
  createHotel,
  listHotel,
  deleteHotel,
  homepage,
  searchHotel,
  hotelDetail,
} from "../controllers/hotelController.js";
import { authMiddleware } from "../middleware/is-auth.js";

const router = express.Router();

const hotelWebRoute = (app) => {
  // For Admin Page
  router.get("/admin/hotel/list", authMiddleware, listHotel);
  router.post("/admin/hotel/create", authMiddleware, createHotel);
  router.delete("/admin/hotel/delete/:id", authMiddleware, deleteHotel);

  // For Client Page
  router.get("/client/homepage", homepage);
  router.post("/client/hotel/search", searchHotel);
  router.get("/client/hotel/:id", hotelDetail);
  return app.use("/", router);
};

export default hotelWebRoute;
