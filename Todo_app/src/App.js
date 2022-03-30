import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "./redux/actions/Action.js";
import Task from "./components/Task";
import MainMenu from "./components/MainMenu.js";
import useSWR from "swr";
import axios from "axios";
import configService from "./components/config.js";

const fetcher = async (url) => {
  return await axios.get(url).then((res) => res.data);
};

const App = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const doShowALL = useSelector((state) => state.doShowALL);
  const doSortAZ = useSelector((state) => state.doSortAZ);

  const optionAxios = `doShowAll=${doShowALL}&doSortAZ=${doSortAZ}`;

  const {
    data: tasksToShow,
    error,
    mutate,
  } = useSWR(configService.todo_api + `?${optionAxios}`, fetcher);

  console.log(optionAxios);
  const changeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const addTaskKey = (event) => {
    if (event.keyCode === 13) {
      dispatch(
        addNewTask({ name: taskName, complete: false }, tasksToShow, mutate)
      );
      setTaskName("");
    }
  };

  const addTask = () => {
    const url = configService.todo_api + `?doShowAll=${doShowALL}`;
    dispatch(addNewTask({ name: taskName }, url, mutate));
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
      <MainMenu tasksToShow={tasksToShow} mutate={mutate} />
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
          {tasksToShow &&
            tasksToShow.map((task, index) => {
              return (
                <Task
                  key={index}
                  task={task}
                  tasksToShow={tasksToShow}
                  mutate={mutate}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
