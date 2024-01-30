import { db } from "../connect.js";

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
