import express from "express";
const router = express.Router();

import {
  getExams,
  getExamDetails,
  getExamQuestions,
} from "../controllers/exam.js";

//GET
router.get("/:teacherId", getExams); // exams of a single teacher
router.get("/details/:id", getExamDetails); // details of a specific exam
router.get("/questions/:id", getExamQuestions); // questions in an exam

//POST

export default router;
