import express from "express";
const app = express();

import userRoute from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// middlewares
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/auth", userRoute);

app.listen(8800, () => {
  console.log("backend running...");
});
