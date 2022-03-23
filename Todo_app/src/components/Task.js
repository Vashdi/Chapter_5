import { useDispatch, useSelector } from "react-redux";
import {
  actionSetTaskName,
  deleteTheTask,
  toggleComplete,
} from "../redux/actions/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";
import ConfigService from "./config";

const Task = ({ task }) => {
  const allTasks = useSelector((state) => state.allTasks);
  const [isEdit, setIsEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  let dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(toggleComplete(task.id, allTasks));
  };

  const deleteTask = () => {
    dispatch(deleteTheTask(task.id, allTasks));
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeTaskName = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleSendTaskNameChangeClick = async (event) => {
    if (event.keyCode === 13) {
      let id = task.id;
      setIsEdit(!isEdit);
      await axios.put(ConfigService.update_api + id, {
        name: newTaskName,
      });
      dispatch(actionSetTaskName(allTasks, id, newTaskName));
    }
  };

  const handleSendTaskNameChangeBlur = (event) => {
    console.log("HEY");
  };

  return (
    <div style={{ marginBottom: "2.5px" }}>
      {isEdit ? (
        <input
          type="text"
          value={newTaskName}
          onChange={handleChangeTaskName}
          onKeyDown={handleSendTaskNameChangeClick}
          onBlur={handleSendTaskNameChangeBlur}
        />
      ) : (
        task.name
      )}
      <input
        id={task.id}
        type="checkbox"
        style={{
          cursor: "pointer",
        }}
        checked={task.complete}
        onChange={handleCheck}
      />
      <EditIcon
        fontSize="7px"
        style={{ cursor: "pointer" }}
        onClick={handleEditClick}
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
