import { db } from "../connect.js";
import moment from "moment/moment.js";

// questions of a certain teacher
export const viewQuestions = (req, res) => {
  const q = "SELECT * FROM questions WHERE teacher_id = ?";

  db.query(q, [req.params.teacherId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// get single question
export const viewQuestion = (req, res) => {
  const q = "SELECT * FROM questions WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// add a question
export const addQuestion = (req, res) => {
  const q =
    "INSERT INTO questions (`question`,`answer`,`difficulty`, `course`, `chapter`, `teacher_id`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const createdAt = moment().format("YYYY-MM-DD");

  const values = [
    req.body.question,
    req.body.answer,
    req.body.difficulty,
    req.body.course,
    req.body.chapter,
    req.body.teacher_id,
    createdAt,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Question added  successfully");
  });
};

// update a question
export const updateQuestion = (req, res) => {
  const q =
    "UPDATE questions SET question = ?, answer = ?, difficulty = ? WHERE id = ?";

  const values = [
    req.body.question,
    req.body.answer,
    req.body.difficulty,
    req.params.id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Questions updated successfully");
  });
};

//delete a question
export const deleteQuestion = (req, res) => {
  const q = "DELETE FROM questions WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Questions deleted successfully");
  });
};
