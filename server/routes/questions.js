import express from "express";
const router = express.Router();

// the controllers
import { viewQuestions, viewQuestion } from "../controllers/questions.js";

router.get("/", viewQuestions);
router.get("/:id", viewQuestion);

export default router;
