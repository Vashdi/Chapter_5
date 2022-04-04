const app = require("./server");
const supertest = require("supertest");
const api = supertest(app);
const TaskModel = require("./mongoDB/Schemas/TaskSchema.js");

const initialTasks = [
  {
    name: "Nir",
    complete: false,
  },
  {
    name: "Vashdi",
    complete: false,
  },
];

beforeEach(async () => {
  await TaskModel.deleteMany({});
  let taskObject = new TaskModel(initialTasks[0]);
  await taskObject.save();
  taskObject = new TaskModel(initialTasks[1]);
  await taskObject.save();
});

describe("Tasks Tests", () => {
  test("tasks are returned as json", async () => {
    await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two tasks", async () => {
    const response = await api.get("/");
    console.log(response);
    expect(response.body).toHaveLength(2);
  });

  test("spesific task is include", async () => {
    const response = await api.get("/");
    const names = response.body.map((tasks) => tasks.name);

    expect(names).toContain("Vashdi");
  });

  test("adding task", async () => {
    const newTask = {
      name: "Roni",
      complete: false,
    };
    await api.post("/tasks").send({ task: newTask });
    const response = await api.get("/");
    const names = response.body.map((tasks) => tasks.name);
    expect(response.body).toHaveLength(3);
    expect(names).toContain("Roni");
  });

  test("delete task", async () => {
    let task = await TaskModel.findOne({ name: "Nir" });
    await api.delete(`/${task._id}`);
    const response = await api.get("/");
    const names = response.body.map((tasks) => tasks.name);
    expect(response.body).toHaveLength(1);
    expect(names).toContain("Vashdi");
  });
});

describe("test complete filter", () => {
  test("toggle complete", async () => {
    let task = await TaskModel.findOne({ name: "Nir" });
    await api.put(`/updateComplete/${task._id}`).send({ complete: false });
    const response = await api.get("/?doShowAll=true");
    const nirTask = response.body.find((tasks) => tasks.name === "Nir");
    expect(nirTask.complete).toEqual(false);
  });

  test("show only true", async () => {
    let task = await TaskModel.findOne({ name: "Nir" });
    await api.put(`/updateComplete/${task._id}`).send({ complete: true });
    const response = await api.get("/?doShowAll=false");
    expect(response.body).toHaveLength(1);
    const names = response.body.map((task) => task.name);
    expect(names).toContain("Vashdi");
  });
});
