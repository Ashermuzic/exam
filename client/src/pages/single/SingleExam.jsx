import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleQuestion = () => {
  const [exam, setExam] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
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

    axios
      .get("http://localhost:8800/exams/questions/25")
      .then((res) => {
        setExamQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePrint = () => {
    console.log("print functionally");
  };
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
                  {/* <div className="">{res.exam_desc}</div> */}
                  {/* have a section for number of question the exam has and 
                  make a cool chart based on the count of questions and there difficulty*/}
                </div>
              </div>
            );
          })}
        </div>
        <div className="print-button">
          <button onClick={handlePrint}>Print</button>
        </div>
        <div className="bottom">
          <div className="body">
            <div className="exam-desc">
              <div className="single underline">
                <h3>Course Title :</h3>{" "}
                <div style={{ textDecoration: "underline" }}>
                  Mobile Wireless Security
                </div>
              </div>
              <div className="single">
                <div style={{ textDecoration: "underline" }}>TEST-II</div>
              </div>
              <div className="single">
                <h3>Course Code : </h3> CT-7691
              </div>
              <div className="single">
                <h3>Date : </h3>25/jan/2024
              </div>
              <div className="single">
                <h3>Duration : </h3>1 Hr
              </div>
              <div className="single">
                <h3>Total Mark : </h3> 10
              </div>
            </div>
            <div class="instructions">
              <div className="ins-title">Instructions:</div>
              <ol>
                <li>
                  Answer <strong>All</strong> questions.
                </li>
                <li>Any missing data may be suitably assumed.</li>
                <li>Draw neat diagrams wherever required.</li>
                <li>
                  Problems require the final computed result. Leaving the
                  uncalculated result may heavily reduce the mark.
                </li>
                <li>Mark your answers as readable as possible.</li>
                <li>Mark assigned is indicated at the end of each question.</li>
              </ol>
            </div>

            <div className="exam-body">
              <ol>
                {examQuestions.map((examQuestion) => {
                  return <li>{examQuestion.question}</li>;
                })}
              </ol>
            </div>
            <h1 className="good-luck">GOOD LUCK!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
