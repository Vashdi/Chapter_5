import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "./redux/actions/Action.js";
import Task from "./components/Task";
import MainMenu from "./components/MainMenu.js";
import useFetch from "./components/useFetch.js";

const App = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [tasksToShow, getAllTasks, changeTasksToShow, hideAllDoneTasks] =
    useFetch();

  const changeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const addTaskKey = (event) => {
    if (event.keyCode === 13) {
      dispatch(addNewTask({ name: taskName, complete: false }, getAllTasks));
      setTaskName("");
    }
  };

  const addTask = () => {
    dispatch(addNewTask({ name: taskName }, getAllTasks));
    setTaskName("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <MainMenu hideAllDoneTasks={hideAllDoneTasks} getAllTasks={getAllTasks} />
      <h1>My To Do List</h1>
      <div style={{ textAlign: "center" }}>
        <div>
          <input
            type="text"
            onChange={changeTaskName}
            onKeyDown={addTaskKey}
            value={taskName}
          />
        </div>
        <div>
          <input
            type="button"
            onClick={addTask}
            value="ADD"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          />
        </div>
        <div>
          {tasksToShow.map((task, index) => {
            return <Task key={index} task={task} getAllTasks={getAllTasks} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
