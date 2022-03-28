import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";
import ConfigService from "./config";

const Task = ({ task, getAllTasks }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);

  const handleCheck = async () => {
    await axios.put(ConfigService.update_complete_api + task.id, {
      complete: !task.complete,
    });
    await getAllTasks();
  };

  const deleteTask = async () => {
    await axios.delete(ConfigService.todo_api + task.id);
    await getAllTasks();
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeTaskName = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleSendTaskNameChangeClick = async (event) => {
    if (event.keyCode === 13) {
      setIsEdit(!isEdit);
      await axios.put(ConfigService.update_api + task.id, {
        name: newTaskName,
      });
    }
    await getAllTasks();
  };

  return (
    <div style={{ marginBottom: "2.5px" }}>
      {isEdit ? (
        <input
          type="text"
          value={newTaskName}
          onChange={handleChangeTaskName}
          onKeyDown={handleSendTaskNameChangeClick}
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
