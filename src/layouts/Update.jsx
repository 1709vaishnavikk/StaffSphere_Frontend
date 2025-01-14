import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/employees/update/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="update">
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Update;
