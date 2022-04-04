const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
 //if a query is present with the req then query is pulled
 //if query is set to true then data with movies set to true is pulled any other searches are rejected
 //if there is no query with the search all movies are pulled
  if (req.query.is_showing) {
    const { is_showing } = req.query;
    console.log(is_showing);
    is_showing === "true"
      ? res.status(200).json({ data: await service.listShowing() })
      : next({ status: 404, message: "Search method not allowed" });
  } else {
    const data = await service.list();
    res.status(200).json({ data });
  }
}

//checks if inputed movie id is valid
async function movieExists(req, res, next) {
  const { movie_id } = req.params;
  const movie = await service.read(Number(movie_id));
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}
//pulls unique movie data based on id
async function read(req, res, next) {
  const data = await service.read(res.locals.movie.movie_id);
  res.status(200).json({ data });
}
//theaters where movie plays is pulled
async function listTheaters(req, res, next) {
  const data = await service.listTheaters(res.locals.movie.movie_id);
  res.status(200).json({ data });
}
//reviews for based on each movie id is pulled
async function listReviews(req, res, next) {
  const data = await service.listReviews(res.locals.movie.movie_id);
  res.status(200).json({ data });
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
