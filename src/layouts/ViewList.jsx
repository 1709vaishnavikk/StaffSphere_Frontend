import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const ViewList = () => {
  const [jobRole, setJobRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async (filterType) => {
    let url = `${BASE_URL}/employees/byJobRoleAndDesignation`;

    if (filterType === "role" && jobRole) {
      url += `?jobRole=${jobRole}`;
    } else if (filterType === "designation" && designation) {
      url += `?designation=${designation}`;
    } else if (filterType === "both" && jobRole && designation) {
      url += `?jobRole=${jobRole}&designation=${designation}`;
    } else {
      console.error("Invalid filter or missing inputs");
      setEmployees([]);
      return;
    }

    try {
      const response = await axios.get(url);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  return (
    <div className="view-list">
      <h2>View Employees</h2>
      <div>
        <label>Job Role: </label>
        <input value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
        <label>Designation: </label>
        <input value={designation} onChange={(e) => setDesignation(e.target.value)} />
        
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Job Role</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) && employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.jobRole}</td>
              <td>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <div>
          <button onClick={() => fetchEmployees("role")}>Search by Role</button>
          <button onClick={() => fetchEmployees("designation")}>Search by Designation</button>
          <button onClick={() => fetchEmployees("both")}>Search by Both</button>
        </div>
        </div>
    </div>
  );
};

export default ViewList;
