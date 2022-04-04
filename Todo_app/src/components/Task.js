import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";
import configService from "./config";
import produce from "immer";

const Task = ({ task, tasksToShow, mutate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);

  const updateFn = async (newTasksToShow) => {
    await axios.delete(configService.todo_api + task._id);
    return newTasksToShow;
  };

  const updateName = async (filteredTodos) => {
    const resUpdatedTask = await axios.put(
      configService.update_api + task._id,
      {
        name: newTaskName,
      }
    );
    return filteredTodos;
  };

  const updateCheck = async (newTasks) => {
    const res = await axios.put(configService.update_complete_api + task._id, {
      complete: !task.complete,
    });
    return newTasks;
  };

  const handleCheck = async () => {
    const newTasksToShow = produce(tasksToShow, (draftState) => {
      const index = tasksToShow.findIndex(
        (oldTask) => oldTask._id === task._id
      );
      draftState[index].complete = !tasksToShow[index].complete;
    });
    const options = {
      optimisticData: newTasksToShow,
      rollbackOnError: true,
    };
    mutate(updateCheck(newTasksToShow), options);
  };

  const deleteTask = async (tasksToShow) => {
    const newTasksToShow = tasksToShow.filter(
      (taskToCheck) => taskToCheck._id !== task._id
    );

    const options = {
      optimisticData: newTasksToShow,
      rollbackOnError: true,
    };

    mutate(updateFn(newTasksToShow), options);
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
      const newTasksToShow = produce(tasksToShow, (draftState) => {
        const index = tasksToShow.findIndex(
          (oldTask) => oldTask._id === task._id
        );
        draftState[index].name = newTaskName;
      });

      const options = {
        optimisticData: newTasksToShow,
        rollbackOnError: true,
      };
      mutate(updateName(newTasksToShow), options);
    }
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
        id={task._id}
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
        onClick={() => deleteTask(tasksToShow)}
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
