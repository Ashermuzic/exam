import "./newExam.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewExam = ({ inputs, title }) => {
  const username = localStorage.getItem("user");
  const teacher = JSON.parse(username);
  const teacher_id = teacher.id;

  const [courseCount, setCourseCount] = useState(0);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    difficulty: "",
    teacher_id: teacher_id,
  });

  const [selectedChapters, setSelectedChapters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/info/course-chapters/1")
      .then((res) => {
        setCourseCount(res.data.chapters);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChapterCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedChapters([...selectedChapters, value]);
    } else {
      setSelectedChapters(
        selectedChapters.filter((chapter) => chapter !== value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can use selectedChapters array in your formData
    const updatedFormData = {
      ...formData,
      chapters: selectedChapters,
    };

    axios
      .post("http://localhost:8800/questions/add", updatedFormData)
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

  console.log(courseCount);

  const generateCheckboxes = () => {
    const checkboxes = [];
    for (let i = 1; i <= courseCount; i++) {
      checkboxes.push(
        <div key={i}>
          <p>{i}</p>
          <input
            type="checkbox"
            name={`chapter-${i}`}
            id={`chapter-${i}`}
            value={i}
            className="chapter"
            onChange={handleChapterCheckboxChange}
          />
        </div>
      );
    }
    return checkboxes;
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
            </form>
          </div>
          <div className="left">
            <div className="query-box">
              <h3>Query</h3>
              <label>Chapters</label>
              <div className="chapters">{generateCheckboxes()}</div>
              <label htmlFor="">Amount of questions</label>
              <div className="questions-amount">
                <p>easy</p>
                <input type="number" name="amount" min={0} defaultValue={0} />
                <p>medium</p>
                <input type="number" name="amount" min={0} defaultValue={0} />
                <p>hard</p>
                <input type="number" name="amount" min={0} defaultValue={0} />
              </div>
            </div>
          </div>
        </div>
        <button className="button" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewExam;
