import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js";
import job from "./config/corns.js";

dotenv.config();

const app = express();
//middleware
app.use(ratelimiter)
app.use(express.json());

if (process.env.NODE_ENV === "production") job.start(); // we use this if use production
const PORT = process.env.PORT || 5001;

// connectDB(process.env.DATABASE_URL)

// for api runging every in 14 minute to not stop backend in render 
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// app.get("/", (req, res) => {
//   res.send("It is working ");
// });

app.use("/api/transactions",transactionRoute);
// app.use("/api/Products",transactionRoute);

console.log(process.env.PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT :", PORT);
  });
});
