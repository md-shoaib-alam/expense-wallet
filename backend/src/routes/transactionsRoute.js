import express from "express";

import { createTransactions, deleteTransaction, getTransactionByUserId, summaryTransactions } from "../controllers/transactionsController.js";
const router = express.Router()

router.get("/:userId",getTransactionByUserId)

router.post("/",createTransactions)

router.delete("/:id",deleteTransaction)

router.get("/summary/:userId", summaryTransactions)

export default router