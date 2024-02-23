import "./examlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const ExamList = (examId) => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/exams/${examId.examId}`)
      .then((res) => {
        setExams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="container">
          <div className="title">
            Exams List
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div>

          <div className="exam-cards">
            {exams.map((exam) => {
              return (
                <div className="exam-card">
                  <div className="card-top">
                    <div className="exam-title">{exam.exam_name}</div>
                    <div className="exam-date" style={{ fontSize: "13px" }}>
                      {exam.created_date}
                    </div>
                  </div>
                  <div className="exam-detail">{exam.exam_desc}</div>
                  <div className="card-bottom">
                    <div className="exam-diff">{exam.difficulty}</div>
                    <Link to={`/exams/${exam.id}`}>
                      <div className="icon">
                        <OpenInNewIcon />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamList;
