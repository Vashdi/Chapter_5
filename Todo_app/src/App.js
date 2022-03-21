import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "./redux/actions/Action.js";
import Task from "./components/Task";
import MainMenu from "./components/MainMenu.js";

const App = () => {
  let dispatch = useDispatch();
  let allTasks = useSelector((state) => state.allTasks);
  let taskId = useSelector((state) => state.ID);
  const [taskName, setTaskName] = useState("");
  const [tasksToShow, setTasksToShow] = useState(allTasks);

  useEffect(() => {
    setTasksToShow(allTasks);
  }, [allTasks]);

  useEffect(() => {
    console.log(allTasks);
  }, [allTasks]);

  const changeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const addTaskKey = (event) => {
    if (event.keyCode === 13) {
      dispatch(addNewTask({ id: taskId, name: taskName, complete: false }));
      setTaskName("");
    }
  };

  const addTask = () => {
    dispatch(addNewTask({ id: taskId, name: taskName, complete: false }));
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
      <MainMenu
        setNewTasksToShow={(newTasksToShow) => setTasksToShow(newTasksToShow)}
      />
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
            return <Task key={index} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
