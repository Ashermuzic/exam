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
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    difficulty: "",
    teacher_id: teacher_id,
  });

  const [pExamData, setPExamData] = useState({
    pExam_Id: "",
    pExam_chapters: [],
    pExam_amount: [],
  });

  const [selectedChapters, setSelectedChapters] = useState([]);

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

  // const handleChapterCheckboxChange = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedChapters([...selectedChapters, value]);
  //   } else {
  //     setSelectedChapters(
  //       selectedChapters.filter((chapter) => chapter !== value)
  //     );
  //   }
  // };

  const handleChapterCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the chapter to selectedChapters
      setSelectedChapters([...selectedChapters, value]);
      // Update pExamData with the selected chapter
      setPExamData((prevData) => ({
        ...prevData,
        pExam_chapters: [...prevData.pExam_chapters, value],
      }));
    } else {
      // Remove the chapter from selectedChapters
      setSelectedChapters(
        selectedChapters.filter((chapter) => chapter !== value)
      );
      // Update pExamData by filtering out the unselected chapter
      setPExamData((prevData) => ({
        ...prevData,
        pExam_chapters: prevData.pExam_chapters.filter(
          (chapter) => chapter !== value
        ),
      }));
    }
  };

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

    const { pExam_chapters, pExam_amount } = pExamData;
    // Create the exam
    console.log(formData);
    axios
      .post("http://localhost:8800/exams/new-exam", formData)
      .then((res) => {
        const examId = res.data.insertId;

        const populateData = {
          examId: examId,
          chapters: pExam_chapters,
          amount: [pExam_amount.easy, pExam_amount.medium, pExam_amount.hard],
        };

        console.log(populateData);

        axios
          .post("http://localhost:8800/exams/populate-exam", populateData)
          .then((res) => {
            console.log("Exam populated successfully");
            navigate("/exams");
          })
          .catch((err) => {
            console.log(err);
          });
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

  // const handlePopulateData = (e, inputName) => {
  //   const { name, value } = e.target;
  //   setPExamData((prevData) => ({
  //     ...prevData,
  //     [inputName]: {
  //       ...prevData[inputName],
  //       [name]: value,
  //     },
  //   }));
  // };

  const handlePopulateData = (e, inputName) => {
    const { name, value } = e.target;
    setPExamData((prevData) => ({
      ...prevData,
      [inputName]: {
        ...prevData[inputName],
        [name]: value,
      },
    }));
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
              {/* Dropdown for selecting course */}
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
                <input
                  type="number"
                  name="easy"
                  min={0}
                  defaultValue={0}
                  onChange={(e) => handlePopulateData(e, "pExam_amount")}
                />
                <p>medium</p>
                <input
                  type="number"
                  name="medium"
                  min={0}
                  defaultValue={0}
                  onChange={(e) => handlePopulateData(e, "pExam_amount")}
                />
                <p>hard</p>
                <input
                  type="number"
                  name="hard"
                  min={0}
                  defaultValue={0}
                  onChange={(e) => handlePopulateData(e, "pExam_amount")}
                />
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
