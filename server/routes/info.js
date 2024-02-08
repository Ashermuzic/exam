import express from "express";
const router = express.Router();

import { getTeacherCourses, getCourses } from "../controllers/info.js";

router.get("/teacherCourses/:id", getTeacherCourses);
router.get("/courses", getCourses);

export default router;
