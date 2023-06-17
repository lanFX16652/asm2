import express from "express";
import { logIn, register, adminLogIn } from "../controllers/authController.js";

const authenticateRouter = express.Router();

authenticateRouter.post("/admin/login", adminLogIn);

authenticateRouter.post("/client/signup", register);
authenticateRouter.post("/client/login", logIn);

export { authenticateRouter };
