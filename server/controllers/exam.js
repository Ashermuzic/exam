import { db } from "../connect.js";

export const getExams = (req, res) => {
  // Get the exams of a single teacher
  // const q =
  //   "SELECT id, exam_name, exam_desc, difficulty, course, created_date FROM exam_details WHERE teacher_id = ?";

  const q = `
  SELECT ed.id, ed.exam_name, ed.exam_desc, ed.difficulty, c.course_name, ed.created_date
  FROM exam_details ed
  JOIN courses c ON ed.course = c.id
  WHERE ed.teacher_id = ?
  `;

  db.query(q, [req.params.teacherId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getExamDetails = (req, res) => {
  // Get the details of a specific exam
  const q = `
  SELECT ed.*, c.course_name
  FROM exam_details ed
  JOIN courses c ON ed.course = c.id
  WHERE ed.id = ?
  `;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getExamQuestions = (req, res) => {
  // Get the questions in an exam
  const q = "SELECT questions_id FROM exam_questions WHERE exam_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
