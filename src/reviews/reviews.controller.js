const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const req = require("express/lib/request");
//lists all reviews
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}
//checks if review is present based on inputted id
async function reviewExists(req, res, next) {
  const { review_id } = req.params;
  console.log(review_id);
  const review = await service.read(review_id);
  // console.log(review);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}
//if id is valid the review is pulled
async function read(req, res, next) {
  const data = await service.read(res.locals.review.review_id);
  console.log(data);
  res.status(200).json({ data });
}
//review is deleted based on id
async function destroy(req, res, next) {
  const data = await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}
// review is updated with the inputed request
//at first review is updated then review with the added critic data is returned as final result
async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const update = await service.update(updatedReview);
  const data = await service.readCriticForUpdate(updatedReview.review_id);
  res.json({ data });
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
