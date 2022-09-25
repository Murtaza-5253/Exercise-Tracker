import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import EditExcercise from "./EditExcercise";
import Exercise from "./Exercise";

export default function ExcercisesList() {
  const [exercises, setExercises] = useState([]);
  const [show, setShow] = useState(false);
  const [editExercise, setEditExercise] = useState({});

  useEffect(() => {
    fetch("https://stark-dusk-68963.herokuapp.com/exercises/", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setExercises(res);
      });
  }, []);

  const handleEditAndCloseClick = (exercise, val) => {
    setEditExercise(exercise);
    setShow(val);
  };

  return (
    <div>
      <h3>Logged Exercise</h3>

      <Table striped bordered hover>
        {exercises.length > 0 && (
          <thead>
            <tr>
              {Object.keys(exercises[0]).map((key, index) => {
                if (["_id", "__v", "createdAt", "updatedAt"].includes(key))
                  return null;
                return <th key={index}>{key}</th>;
              })}
              <th>Actions</th>
            </tr>
          </thead>
        )}
        <tbody>
          {exercises.map((ex, index) => (
            <Exercise
              exercise={ex}
              key={index}
              setExercises={setExercises}
              handleEditAndCloseClick={handleEditAndCloseClick}
            />
          ))}
        </tbody>
      </Table>
      <EditExcercise
        exercise={editExercise}
        show={show}
        handleClose={handleEditAndCloseClick}
        setExercises={setExercises}
      />
    </div>
  );
}
