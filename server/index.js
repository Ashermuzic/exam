import express from "express";
const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/auth.js";
import questionsRoute from "./routes/questions.js";
import examRoute from "./routes/exam.js";
import infoRoute from "./routes/info.js";

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
app.use("/questions", questionsRoute);
app.use("/exams", examRoute);
app.use("/info", infoRoute);

app.listen(8800, () => {
  console.log("backend running...");
});
