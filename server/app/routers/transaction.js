import express from "express";
import {
  createTransaction,
  listTransaction,
  userTransaction,
} from "../controllers/transactionController.js";
import { authMiddleware } from "../middleware/is-auth.js";

// khoi tao router
const router = express.Router();

// them cac api cho routes hanlder
//For Admin Page
router.get("/admin/transaction/list/all", authMiddleware, listTransaction);

// For Client Page
router.post("/client/transaction/create", createTransaction);
router.get("/client/transaction/list/user/:userId", userTransaction);

const transactionRoute = router;
export default transactionRoute;
