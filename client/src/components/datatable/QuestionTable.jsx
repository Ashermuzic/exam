import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Datatable = () => {
  const [data, setData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch questions data
    axios
      .get(`http://localhost:8800/questions/${currentUser.id}`)
      .then((questionsRes) => {
        // Fetch course data
        axios
          .get("http://localhost:8800/info/courses")
          .then((coursesRes) => {
            // Create a map of course IDs to course names
            const courseMap = {};
            coursesRes.data.forEach((course) => {
              courseMap[course.id] = course.course_name;
            });

            // Map over the questions data and replace course IDs with course names
            const newData = questionsRes.data.map((item) => {
              return {
                ...item,
                course_name: courseMap[item.course],
              };
            });

            // Update state with the modified data
            setData(newData);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8800/questions/delete/${id}`)
      .then((res) => {
        if (res.status == 200) {
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 175,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/questions/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View Detail</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Questions
        <Link to="/questions/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
