const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// select * from movies
function list() {
  return knex("movies").select("*");
}

// select distinct m.* from movies m join movies_theaters mt on m.movie_id = mt.movie_id where mt.is_showing = true
function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true })
    .distinct("m.*");
}

//select * from movies m where movie_id = 5(any valid number)
function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

// select t.*, mt.is_showing, mt.movie_id from theaters t join movies_theaters mt on t.theater_id = mt.theater_id where mt.movie_id = 3(movie_id)
function listTheaters(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movie_id })
    .select("t.*", "mt.is_showing", " mt.movie_id");
}
const addCategory = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

//select c.*, r.* from critics c join reviews r on r.critic_id = c.critic_id where r.movie_id = 2
function listReviews(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("c.*", "r.*")
    .where({ "r.movie_id": movie_id })
    .then((response) => {
      return response.map((eachResponse) => addCategory(eachResponse));
    });
}
module.exports = {
  list,
  listShowing,
  read,
  listTheaters,
  listReviews,
};
