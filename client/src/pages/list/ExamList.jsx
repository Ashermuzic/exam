import "./examlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ExamList = () => {
  const [exams, setExams] = useState();

  useEffect(() => {
    axios
      .get("")
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
            <div className="exam-card">
              <div className="card-top">
                <div className="exam-title">Data Structures</div>
                <div className="exam-date" style={{ fontSize: "13px" }}>
                  2024/2/19
                </div>
              </div>
              <div className="exam-detail">
                this the the place where you will put the exam detaisl
                expalining about the general things about the exam
              </div>
              <div className="card-bottom">
                <div className="exam-diff">Easy</div>
                <div className="icon">
                  <OpenInNewIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamList;
