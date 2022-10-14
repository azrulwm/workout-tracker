import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutUpdate = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const updatedWorkout = { title, load, reps };

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setError(json.error);
      //   setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      //   setEmptyFields([]);
      console.log("workout updated");
      // dispatch({ type: "UPDATE_WORKOUT", payload: json });
      console.log(json);
    }
  };

  return (
    <form className="edit" onSubmit={handleSubmit}>
      <h3>Edit Workout</h3>

      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <label>Load: (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        required
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        required
      />
      <button>Update Workout</button>
    </form>
  );
};

export default WorkoutUpdate;
