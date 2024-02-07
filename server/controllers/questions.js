import { db } from "../connect.js";
import moment from "moment/moment.js";

export const viewQuestions = (req, res) => {
  const q = "SELECT * FROM questions";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const viewQuestion = (req, res) => {
  const q = "SELECT * FROM questions WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addQuestion = (req, res) => {
  const q =
    "INSERT INTO questions (`question`,`answer`,`difficulty`,`teacher_id`, `createdAt`) VALUES (?, ?, ?, ?, ?)";

  const createdAt = moment().format("YYYY-MM-DD");

  const values = [
    req.body.question,
    req.body.answer,
    req.body.difficulty,
    req.body.teacher_id,
    createdAt,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Question added  successfully");
  });
};

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

export const deleteQuestion = (req, res) => {
  const q = "DELETE FROM questions WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Questions deleted successfully");
  });
};
