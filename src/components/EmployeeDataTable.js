import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const EmployeeDataTable = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:8080";
    const [employees, setEmployees] = useState([]);
    const setEmployeeData = () => {
        axios.get(baseURL + "/emp").then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data:" + error);
        });
    }
    useEffect(() => {
        setEmployeeData();
    }, []);
    const removeEmployee = (id) => {
        axios.delete(baseURL + "/emp/" + id).then((response) => {
            alert("Employee record " + id + " deleted!");
            setEmployeeData();
            navigate('/read')

        }).catch(error => {
            alert("Error Ocurred in removeEmployee:" + error);
        });
    }
    const removeAllEmployee = (id) => {
        axios.delete(baseURL + "/emp").then((response) => {
            alert("All Employees deleted!");
            setEmployeeData();
            navigate('/read')
        }).catch(error => {
            alert("Error Ocurred in removeEmployee:" + error);
        });
    }
    return (

        <div class="card-body">
            <br/>
            <nav>
                <button
                    className="btn btn-primary nav-item active"
                    onClick={() => navigate("/create")}>
                    Create New Employee
                </button>
            </nav>
            <br></br>
            <div className="col-md-6">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <table class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Phone Number</th>
                                    <th>DOB</th>
                                    <th>Address</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    employees &&
                                    employees.map((employee, index) => (
                                        <tr>
                                            <th scope="row">{employee.id}</th>
                                            <td>{employee.fName}</td>
                                            <td>{employee.lName}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.status}</td>
                                            <td>{employee.phoneNumber}</td>
                                            <td>{employee.dob}</td>
                                            <td>{employee.address}</td>
                                            <td>
                                                <Link to={"/edit/" + employee.id}><img src={editIcon} alt="Edit"
                                                                                       width="20" height="10"
                                                                                       title="Edit"/>
                                                </Link>
                                                <button
                                                    onClick={() => removeEmployee(employee.id)} className="button"
                                                ><img src={deleteIcon} alt="Remove" title="Remove" width="10"
                                                      height="10"/>
                                                </button>
                                            </td>
                                        </tr>

                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="btn btn-sm btn-danger"
                        onClick={() => removeAllEmployee()}>
                    Remove All
                </button>
            </div>
        </div>
    );
}
export default EmployeeDataTable;