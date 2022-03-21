import { useDispatch, useSelector } from "react-redux";
import { deleteTheTask, toggleComplete } from "../redux/actions/Action";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ task }) => {
  const allTasks = useSelector((state) => state.allTasks);
  let dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(toggleComplete(task.id, allTasks));
  };

  const deleteTask = () => {
    dispatch(deleteTheTask(task.id, allTasks));
  };

  return (
    <div style={{ marginBottom: "2.5px" }}>
      {task.name}
      <input
        id={task.id}
        type="checkbox"
        style={{
          cursor: "pointer",
        }}
        checked={task.complete}
        onChange={handleCheck}
      />
      <button
        onClick={deleteTask}
        style={{
          background: "transparent",
          border: "0",
          cursor: "pointer",
        }}
      >
        <DeleteIcon fontSize="5px" />
      </button>
    </div>
  );
};

export default Task;
