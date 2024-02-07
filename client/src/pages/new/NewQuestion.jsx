import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({ inputs, title }) => {
  const username = localStorage.getItem("user");
  const teacher = JSON.parse(username);
  const teacher_id = teacher.id;

  console.log(teacher_id);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    difficulty: "",
    teacher_id: teacher_id,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8800/questions/add", formData)
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
