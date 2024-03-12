import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Form, Button, Container, Alert} from 'react-bootstrap';

const EmployeeForm = () => {
    const baseURL = "http://localhost:8080/emp";
    const navigate = useNavigate();
    const [enteredfName, setfName] = useState('');
    const [enteredlName, setlName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredStatus, setlsStatus] = useState('');
    const [enteredPhoneNumber, setPhoneNumber] = useState('');
    const [enteredDob, setDob] = useState('');
    const [enteredAddress, setAddress] = useState('');
    const fNameChangeHandler = (event) => {
        setfName(event.target.value);
    };
    const lNameChangeHandler = (event) => {
        setlName(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const statusChangeHandler = (event) => {
        setlsStatus(event.target.value);
    };

    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
    };

    const dobChangeHandler = (event) => {
        setDob(event.target.value);
    };
    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    };

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
            .post(baseURL, {
                fName: enteredfName,
                lName: enteredlName,
                email: enteredEmail,
                status: enteredStatus,
                phoneNumber: enteredPhoneNumber,
                dob: enteredDob,
                address: enteredAddress
            })
            .then((response) => {
                alert("Employee " + enteredfName + " added!");
                navigate("/read");
            }).catch(error => {
            alert("error===" + error);
        });
    };
    const cancelHandler = () => {
        //reset the values of input fields
        setfName('');
        setlName('');
        setEmail('');
        setlsStatus('');
        setPhoneNumber('');
        setDob('');
        setAddress('');
        navigate("/read");
    }
    return (
        <Alert variant='primary'>
            <Container>
                <Form onSubmit={submitActionHandler}>
                    <Form.Group controlId="form.fName">
                        <Form.Label>User First Name</Form.Label>
                        <Form.Control type="text" value={enteredfName} onChange={fNameChangeHandler}
                                      placeholder="Enter User First Name" required/>
                    </Form.Group>
                    <Form.Group controlId="form.lName">
                        <Form.Label>User Last Name</Form.Label>
                        <Form.Control type="text" value={enteredlName} onChange={lNameChangeHandler}
                                      placeholder="Enter User Last Name" required/>
                    </Form.Group>
                    <Form.Group controlId="form.email">
                        <Form.Label>User Email</Form.Label>
                        <Form.Control type="email" value={enteredEmail} onChange={emailChangeHandler}
                                      placeholder="Enter User Email" required/>
                    </Form.Group>
                    <Form.Group controlId="form.status">
                        <Form.Label>User Status</Form.Label>
                        <select value={enteredStatus} onChange={statusChangeHandler}>
                            <option value="Active">Active</option>
                            <option value="InActive">InActive</option>
                        </select>
                    </Form.Group>


                    <Form.Group controlId="form.phoneNumber">
                        <Form.Label>User Phone Number</Form.Label>
                        <Form.Control type="text" value={enteredPhoneNumber} onChange={phoneNumberChangeHandler}
                                      placeholder="Enter User Phone Number" required/>
                    </Form.Group>
                    <Form.Group controlId="form.dob">
                        <Form.Label>User Date of Birth</Form.Label>
                        <Form.Control type="date" value={enteredDob} onChange={dobChangeHandler}
                                      placeholder="Enter User Date of Birth" required/>
                    </Form.Group>
                    <Form.Group controlId="form.address">
                        <Form.Label>User Address</Form.Label>
                        <Form.Control type="text" value={enteredAddress} onChange={addressChangeHandler}
                                      placeholder="Enter User Address" required/>
                    </Form.Group>
                    <br></br>
                    <Button type='submit'>Add Employee</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type='submit' onClick={() => cancelHandler()}>Cancel</Button>
                </Form>
            </Container>
        </Alert>
    );
}
export default EmployeeForm;