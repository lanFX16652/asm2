import express from 'express';
import webController from "../controllers/webController";

const router = express.Router()

const initWebRoute = (app) => {
    router.get("/homepage", webController.homepage);
    router.post("/search", webController.search);
    router.get("/hotel/:id", webController.hotelDetail);
    router.get("/room-number/:id", webController.getRoomNumberList);
    return app.use("/", router);
}

export default initWebRoute;