const knex = require("../db/connection");

//select * from critics
function list() {
  return knex("critics").select("*");
}

module.exports = {
  list,
};
