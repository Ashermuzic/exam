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
  const [courseCount, setCourseCount] = useState(0);
  const [error, setError] = useState("");

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    difficulty: "",
    teacher_id: teacher_id,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/info/teacherCourses/${teacher_id}`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teacher_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/info/course-chapters/${selectedCourse}`)
      .then((res) => {
        setCourseCount(res.data.chapters);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setFormData({
      ...formData,
      course: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedChapter || selectedChapter === "") {
      console.log("Please select a chapter.");
      return;
    }

    const updatedFormData = {
      ...formData,
      course: selectedCourse,
      chapter: selectedChapter,
    };

    console.log(updatedFormData);
    axios
      .post("http://localhost:8800/questions/add", updatedFormData)
      .then((res) => {
        navigate("/questions");
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  const handleInputChange = (e, inputName) => {
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });
  };

  const handleChapterCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedChapter(value);
    } else {
      setSelectedChapter("");
    }
  };

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
            checked={selectedChapter === i.toString()}
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
              <div className="formInput">
                <label>Course</label>
                <select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="select-course"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="chapters">{generateCheckboxes()}</div>
              <div className="formInput">
                <label>Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange(e, "difficulty")}
                  className="select-course"
                >
                  <option value="">Select the difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <p className="error">{error}</p>
              <button onClick={handleSubmit}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
