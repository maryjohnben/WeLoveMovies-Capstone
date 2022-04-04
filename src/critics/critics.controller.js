const service = require("./critics.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//lists all critics data
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
