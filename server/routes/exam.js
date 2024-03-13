import express from "express";
const router = express.Router();

import {
  getExams,
  getExamDetails,
  getExamQuestions,
  createExam,
  populateExam,
} from "../controllers/exam.js";

//GET
router.get("/:teacherId", getExams); // exams of a single teacher
router.get("/details/:id", getExamDetails); // details of a specific exam
router.get("/questions/:id", getExamQuestions); // questions in an exam

//POST
router.post("/new-exam", createExam); // create new exam
router.post("/populate-exam", populateExam); // add random questions based the queries to an existing exam

export default router;
