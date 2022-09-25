import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateUser() {
  const [username, setUsername] = useState("test User");

  function onSubmit(e) {
    e.preventDefault();
    const user = JSON.stringify({
      username: username,
    });
    console.log(user);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: user,
      redirect: "follow",
    };
    fetch("https://stark-dusk-68963.herokuapp.com/users/add/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  const handleChange = (val, setter) => {
    setter(val);
  };

  return (
    <Form className="mt-5" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          onChange={(e) => handleChange(e.target.value, setUsername)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
