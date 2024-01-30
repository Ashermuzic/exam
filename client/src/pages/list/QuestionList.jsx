import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import QuestionTable from "../../components/datatable/QuestionTable";

const QuestionList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <QuestionTable />
      </div>
    </div>
  );
};

export default QuestionList;
