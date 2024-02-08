import { db } from "../connect.js";

export const getTeacherCourses = (req, res) => {
  const q = "SELECT * FROM teacher_courses WHERE teacher_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getCourses = (req, res) => {
  const q = "SELECT * FROM courses";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
