import express from "express";

import { createTransactions, deleteTransactions, getTransactionByUserId, summaryTransactions } from "../controllers/transactionsController.js";
const router = express.Router()

router.get("/:userId",getTransactionByUserId)

router.post("/",createTransactions)

router.delete("/:id",deleteTransactions)

router.get("/summary/:userId", summaryTransactions)

export default router