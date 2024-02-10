import express from "express";
const router = express.Router();

import {
  getExams,
  getExamDetails,
  getExamQuestions,
} from "../controllers/exam.js";

//GET
router.get("/:teacherId", getExams);
router.get("/details/:id", getExamDetails);
router.get("/questions/:id", getExamQuestions);

//POST

export default router;
