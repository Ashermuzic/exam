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

router.get("/", viewQuestions);
router.get("/:id", viewQuestion);
router.post("/add", addQuestion);
router.put("/update/:id", updateQuestion);
router.delete("/delete/:id", deleteQuestion);

export default router;
