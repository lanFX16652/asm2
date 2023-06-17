import express from "express";
import {
  getRoomNumberList,
  listRoom,
  createRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import { authMiddleware } from "../middleware/is-auth.js";

const router = express.Router();

const roomWebRoute = (app) => {
  // For Admin Page
  router.get("/admin/room/list", authMiddleware, listRoom);
  router.post("/admin/room/create", authMiddleware, createRoom);
  router.delete("/admin/room/delete/:id", authMiddleware, deleteRoom);

  // For Client Page
  router.get("/client/room-number/:id", getRoomNumberList);
  return app.use("/", router);
};

export default roomWebRoute;
