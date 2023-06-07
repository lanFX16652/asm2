import express from "express";
import adminController from "../controllers/adminController";
import webController from "../controllers/webController";
import hotelController from "../controllers/hotelController"


const router = express.Router();

const hotelWebRoute = (app) => {
    // For Admin Page
    router.get("/hotel/list", hotelController.listHotel);
    router.post("/hotel/create", hotelController.createHotel);
    router.delete("/hotel/delete/:id", hotelController.deleteHotel);

    // For Client Page
    router.get("/homepage", hotelController.homepage);
    router.post("/hotel/search", hotelController.searchHotel);
    router.get("/hotel/:id", hotelController.hotelDetail);
    return app.use("/", router);
};

export default hotelWebRoute;