import express from "express";
const router = express.Router();

import {
  getTeacherCourses,
  getCourses,
  getCourseChapters,
} from "../controllers/info.js";

router.get("/teacherCourses/:id", getTeacherCourses);
router.get("/courses", getCourses);
router.get("/course-chapters/:courseId", getCourseChapters);

export default router;
