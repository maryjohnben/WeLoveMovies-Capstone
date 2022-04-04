const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { route } = require("express/lib/application");

router
  .route("/:movie_id/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

router
  .route("/:movie_id/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

router.route("/:movie_id").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
