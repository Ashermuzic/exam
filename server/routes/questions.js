import express from "express";
const router = express.Router();

// the controllers
import {
  viewQuestions,
  viewQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questions.js";

router.get("/single/:id", viewQuestion);
router.get("/:teacherId", viewQuestions);
router.post("/add", addQuestion);
router.put("/update/:id", updateQuestion);
router.delete("/delete/:id", deleteQuestion);

export default router;
