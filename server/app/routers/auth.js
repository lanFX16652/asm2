import express from 'express';
import userController from "../controllers/authController";

const router = express.Router()

const userWebRoute = (app) => {
    router.post("/signup", userController.postSignup);
    router.post("/login", userController.postLogin);
    router.get("/logout", userController.logOut);
    return app.use("/", router);
}

export default userWebRoute;