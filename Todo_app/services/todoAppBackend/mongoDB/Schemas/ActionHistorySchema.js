const mongoose = require("mongoose");

const actionHistorySchema = new mongoose.Schema({
  method: String,
  path: String,
  body: Object,
  date: Object,
});

actionHistorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("actionHistoryModel", actionHistorySchema);
