import express from 'express';
import { logIn, register, logOut, adminLogIn } from '../controllers/authController'
import { authMiddleware } from '../middleware/is-auth';

const authenticateRouter = express.Router()

authenticateRouter.post("/admin/login", adminLogIn);
authenticateRouter.get("/admin/logout", authMiddleware, logOut);


authenticateRouter.post("/client/signup", register);
authenticateRouter.post("/client/login", logIn);
authenticateRouter.get("/client/logout", logOut);


export { authenticateRouter };