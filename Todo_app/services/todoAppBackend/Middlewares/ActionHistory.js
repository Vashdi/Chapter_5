const ActionHistoryModel = require("../mongoDB/Schemas/ActionHistorySchema.js");

const getFullDate = () => {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  return day + "/" + month + "/" + year;
};

const getHour = () => {
  return new Date().getHours() + ":" + new Date().getMinutes();
};

const ActionHistory = async (request, response, next) => {
  let method = request.method;
  let path = request.path;
  let body = request.body;
  let date = getFullDate();
  let hour = getHour();
  const action = new ActionHistoryModel({
    method: method,
    path: path,
    body: body,
    date: { day: date, hour: hour },
  });
  await action.save();
  next();
};

module.exports = { ActionHistory };
