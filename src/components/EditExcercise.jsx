import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function EditExcercise({
  exercise,
  show,
  handleClose,
  setExercises,
}) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setUsername(exercise.username);
    setDescription(exercise.description);
    setDuration(exercise.duration);
    setDate(exercise.date);
  }, [exercise]);

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
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: excercise,
    };
    fetch(
      "https://stark-dusk-68963.herokuapp.com/exercises/update/" + exercise._id,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        handleClose({}, false);
        setExercises((prevExercises) => {
          const idx = prevExercises.findIndex((ex) => ex._id === exercise._id);
          let arr = [...prevExercises];
          arr.splice(idx, 1, res);
          return arr;
        });
      });
  }

  return (
    <Modal show={show} onHide={() => handleClose({}, false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editing {exercise.description}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-5" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Duration"
              value={username}
              onChange={(e) => handleChange(e.target.value, setUsername)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => handleChange(e.target.value, setDescription)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(e) => handleChange(e.target.value, setDuration)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Date</Form.Label>
            <input
              type="date"
              value={date}
              onChange={(e) => handleChange(e.target.value, setDate)}
            />
            {/* <ReactDatePicker
              selected={new Date(date)}
              onChange={(date) => handleChange(date, setDate)}
            /> */}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
