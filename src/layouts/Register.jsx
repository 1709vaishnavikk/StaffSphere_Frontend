import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    designation: "",
    jobRole: "",
    username: "",
    password1: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/employees/register", formData);
    navigate("/login");
  };

  return (
    <div className="register">
      <h2>Register</h2>
      
      <form onSubmit={handleSubmit}>
      
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;