import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handelChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div>
      <div>login</div>
      <input type="text" name="username" onChange={handelChange} />
      <input type="password" name="password" onChange={handelChange} />
      <p>{err && err}</p>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
