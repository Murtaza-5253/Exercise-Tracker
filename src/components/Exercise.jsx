import React from "react";
import { Button } from "react-bootstrap";

export default function Exercise({
  exercise,
  setExercises,
  handleEditAndCloseClick,
}) {
  const deleteExercise = (id) => {
    fetch("https://stark-dusk-68963.herokuapp.com/exercises/" + id, { method: "delete" }).then(
      (res) => {
        if (res.status === 200)
          setExercises((prevExercises) =>
            prevExercises.filter((el) => el._id !== id)
          );
      }
    );
  };
  return (
    <tr>
      <td>{exercise.username}</td>

      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Button
          variant="primary"
          className="mx-1"
          onClick={() => handleEditAndCloseClick(exercise, true)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            deleteExercise(exercise._id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
