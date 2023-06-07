import express from 'express';
import adminController from "../controllers/adminController";

const router = express.Router()

const adminWebRoute = (app) => {
    
    router.get("/hotel/list", adminController.listHotel);
    router.post("/hotel/create", adminController.createHotel);
    router.delete("/hotel/delete/:id", adminController.deleteHotel);
    
    router.get("/room/list", adminController.listRoom);
    router.post("/room/create", adminController.createRoom);
    router.delete("/room/delete/:id", adminController.deleteRoom);
    return app.use("/", router);
}

export default adminWebRoute;