import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewQuestion = ({ inputs, title }) => {
  const username = localStorage.getItem("user");
  const teacher = JSON.parse(username);
  const teacher_id = teacher.id;

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    difficulty: "",
    teacher_id: teacher_id,
  });

  const { questionId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/questions/${questionId}`)
      .then((res) => {
        setFormData({
          ...formData,
          question: res.data[0].question,
          answer: res.data[0].answer,
          difficulty: res.data[0].difficulty,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8800/questions/update/${questionId}`, formData)
      .then((res) => {
        navigate("/questions");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e, inputName) => {
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.name]}
                    onChange={(e) => handleInputChange(e, input.name)}
                  />
                </div>
              ))}
              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
