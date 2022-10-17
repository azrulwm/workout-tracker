import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutUpdate from "./WorkoutUpdate";
import { useState } from "react";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [displayEdit, setDisplayEdit] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEdit = () => {
    return !displayEdit ? setDisplayEdit(true) : setDisplayEdit(false);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      <span className="material-symbols-outlined" onClick={handleEdit}>
        edit
      </span>
      {displayEdit && (
        <WorkoutUpdate workout={workout} setDisplayEdit={setDisplayEdit} />
      )}
    </div>
  );
};

export default WorkoutDetails;
