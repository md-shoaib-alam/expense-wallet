import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js";


dotenv.config();

const app = express();
//middleware
app.use(ratelimiter)
app.use(express.json());


const PORT = process.env.PORT || 5001;

// connectDB(process.env.DATABASE_URL)




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
