import express from "express";
import { createTransaction } from "../controllers/transactionController";


// khoi tao router
const router = express.Router();

// them cac api cho routes hanlder
router.post('/transaction/create', createTransaction);


const transactionRoute = router
export default transactionRoute