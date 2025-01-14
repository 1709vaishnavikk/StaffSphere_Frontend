import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [employee, setEmployee] = useState(null);
  const { id } = useParams(); // Get ID from URL parameters
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send 'password1' as the password field to the backend
      const response = await axios.post("http://localhost:8080/api/employees/login", null, {
        params: { username, password1 }, // Use password1 here
      });
      console.log(response.data);
      setEmployee(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  };

  const deleteEmployee = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/delete/${employee.id}`);
        alert("Employee deleted successfully");
        navigate("/"); // Redirect to home page after deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
  };

  

  return (
    <div className="login">
      <h2>Login</h2>
      {!employee ? (
        <form onSubmit={handleLogin}>
          
          <div>
            <label>Username:</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password1} // Bind to password1
              onChange={(e) => setPassword1(e.target.value)} // Update password1 on change
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {employee.fullName}</h2>
          <p>Email: {employee.email}</p>
          <p>Mobile Number:{employee.mobileNo}</p>
          <p>Job Role: {employee.jobRole}</p>
         
          <p>Designation: {employee.designation}</p>
          <button onClick={() => navigate(`/update/${employee.id}`)}>Edit</button>
          <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Login;
