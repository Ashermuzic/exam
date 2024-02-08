import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="profile-box">
          <div className="left">
            <div className="left-box">
              <div>Asher Samuel</div>
            </div>
          </div>
          <div className="right">right</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
