import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div>
      <div>register</div>
      <form action="">
        <input type="text" name="username" onChange={handleChange} />
        <input type="text" name="password" onChange={handleChange} />
        <p>incase of an error</p>
        <button onClick={handleClick}>Register</button>
      </form>
    </div>
  );
};

export default Register;
