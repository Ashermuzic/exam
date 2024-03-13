import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleQuestion = () => {
  const [exam, setExam] = useState([]);
  const examId = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/exams/details/${examId.examId}`)
      .then((res) => {
        setExam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {exam.map((res) => {
            return (
              <div className="left">
                <div className="editButton">Edit</div>
                <div className="mainTitle">
                  <h1 className="title">{res.exam_name}</h1>
                </div>
                <div className="exam-details">
                  <div className="top-layer">
                    <div style={{ display: "flex" }}>
                      Course Name:{" "}
                      <p style={{ marginLeft: "10px" }}>{res.course_name}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      Difficulty :{" "}
                      <p style={{ marginLeft: "10px" }}>{res.difficulty}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      Date:{" "}
                      <p style={{ marginLeft: "10px" }}>{res.created_date}</p>
                    </div>
                  </div>
                  <div className="">{res.exam_desc}</div>
                  {/* have a section for number of question the exam has and 
                  make a cool chart based on the count of questions and there difficulty*/}
                </div>
              </div>
            );
          })}
        </div>
        <div className="bottom">
          <div className="body">this and that</div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
