export const hideAllDoneTasks = (allTasks, setNewTasksToShow) => {
  let newTasksToShow = allTasks.filter((task) => task.complete !== true);
  setNewTasksToShow(newTasksToShow);
};

export const showAll = (allTasks, setNewTasksToShow) => {
  setNewTasksToShow(allTasks);
};
