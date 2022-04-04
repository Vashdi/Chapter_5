const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  complete: Boolean,
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("TaskModel", taskSchema);
