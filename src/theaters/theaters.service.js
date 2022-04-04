const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//lists all theaters and movies playing in the particular theater based on theater id
// select t.*, m.* from movies m join movies_theaters mt on m.movie_id = mt.movie_id join theaters t on t.theater_id = mt.theater_id
function list() {
  const addMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    // created_at: ["movies", null,"created_at"],
    // updated_at: ["movies",null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    // theater_id: ["movies", null,"theater_id"],
  });

  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "m.*")
    .then(addMovies);
}

module.exports = {
  list,
};
