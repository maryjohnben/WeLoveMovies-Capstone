const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
// select * from reviews
function list() {
  return knex("reviews").select("*");
}
// select * from reviews where review_id = 6(review_id)
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

//delete from reviews where review_id = 6(review_id)
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

const addCategory = mapProperties({
  // critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  // created_at: "critic.created_at",
  // updated_at: "critic.updated_at",
});

// select c.*, r.* from reviews r join critics c on c.critic_id = r.critic_id where r.review_id = 11
function readCriticForUpdate(review_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("c.*", "r.*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCategory);
}
module.exports = {
  list,
  read,
  delete: destroy,
  update,
  readCriticForUpdate,
};
