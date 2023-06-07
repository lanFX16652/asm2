import express from "express";
import { getRoomNumberList, listRoom, createRoom, deleteRoom } from "../controllers/roomController";

const router = express.Router();

const roomWebRoute = (app) => {
    // For Admin Page
    router.get("/room/list", listRoom);
    router.post("/room/create", createRoom);
    router.delete("/room/delete/:id", deleteRoom);

    // For Client Page
    router.get("/room-number/:id", getRoomNumberList);
    return app.use("/", router);
}

export default roomWebRoute;