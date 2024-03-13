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

export const createExam = (req, res) => {
  const q =
    "INSERT INTO exam_details (exam_name, exam_desc, course, teacher_id, created_date, difficulty) VALUES (?)";

  const values = [
    req.body.exam_name,
    req.body.exam_desc,
    req.body.course,
    req.body.teacher_id,
    req.body.created_date,
    req.body.difficulty,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Endpoint to populate an exam with questions
export const populateExam = (req, res) => {
  const { examId, chapters, amount } = req.body;

  const easyAmount = amount[0] || 0;
  const mediumAmount = amount[1] || 0;
  const hardAmount = amount[2] || 0;

  const q = `
    SELECT id, difficulty
    FROM questions
    WHERE chapter IN (?) AND (difficulty = 'easy' OR difficulty = 'medium' OR difficulty = 'hard')
    ORDER BY RAND();
  `;

  db.query(q, [chapters], (err, data) => {
    if (err) return res.status(500).json(err);

    let easyQuestions = [];
    let mediumQuestions = [];
    let hardQuestions = [];

    // Categorize questions based on difficulty
    data.forEach((row) => {
      if (row.difficulty === "easy" && easyQuestions.length < easyAmount) {
        easyQuestions.push([row.id, examId]);
      } else if (
        row.difficulty === "medium" &&
        mediumQuestions.length < mediumAmount
      ) {
        mediumQuestions.push([row.id, examId]);
      } else if (
        row.difficulty === "hard" &&
        hardQuestions.length < hardAmount
      ) {
        hardQuestions.push([row.id, examId]);
      }
    });

    const questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    const insertQ = `
      INSERT INTO exam_questions (questions_id, exam_id)
      VALUES ?;
    `;

    db.query(insertQ, [questions], (insertErr, insertData) => {
      if (insertErr) return res.status(500).json(insertErr);

      return res.status(200).json({ message: "Exam populated successfully" });
    });
  });
};
