export const questionColumns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "question",
    headerName: "Question",
    width: 260,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <p className="cellDetail"> {params.row.question}</p>
        </div>
      );
    },
  },
  {
    field: "answer",
    headerName: "Answer",
    width: 170,
  },
  {
    field: "course_name",
    headerName: "Course",
    width: 140,
  },
  {
    field: "chapter",
    headerName: "Chapter",
    width: 100,
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.difficulty}`}>
          {params.row.difficulty}
        </div>
      );
    },
  },
];
