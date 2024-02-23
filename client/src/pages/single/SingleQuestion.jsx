import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleQuestion = () => {
  const [data, setData] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    axios(`http://localhost:8800/questions/single/${questionId}`)
      .then((res) => {
        setData(res.data);
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
          {data.map((data) => {
            return (
              <div className="left">
                <Link to={`/questions/edit/${data.id}`}>
                  <div className="editButton">Edit</div>
                </Link>
                <div className="mainTitle">
                  <h1 className="title">Question #{data.id}</h1>
                  <p className={`diff ${data.difficulty}`}>{data.difficulty}</p>
                </div>

                <div className="question">{data.question}</div>

                <div className="answer">
                  <p className="glow">Answer: </p>
                  {data.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
