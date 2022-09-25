import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import fetchUrl from "../Constants/fetchUrl";

export default function CreateExcercise() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://stark-dusk-68963.herokuapp.com/users/`, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log("Error:-", err);
      });
  }, []);

  const handleChange = (val, setter) => {
    setter(val);
  };
  function onSubmit(e) {
    e.preventDefault();
    const excercise = JSON.stringify({
      username: username,
      description: description,
      duration: duration,
      date: date,
    });
    console.log(excercise);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Access-Control-Allow-Origin','http://127.0.0.1:5173');
    headers.append('Access-Control-Allow-Credentials', 'true');
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: excercise,
      redirect: "follow",
    };
    fetch("https://stark-dusk-68963.herokuapp.com/exercises/add/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // window.location = "/";
  }
  return (
    <Form className="mt-5" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Select
          value={username}
          onChange={(e) => handleChange(e.target.value, setUsername)}
        >
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          onChange={(e) => handleChange(e.target.value, setDescription)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          placeholder="Duration"
          onChange={(e) => handleChange(e.target.value, setDuration)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Date</Form.Label>
        <ReactDatePicker
          selected={date}
          onChange={(date) => handleChange(date, setDate)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
