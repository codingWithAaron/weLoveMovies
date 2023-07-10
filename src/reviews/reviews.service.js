const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(review_id){
    return knex("reviews")
       .select("*")
       .where({review_id: review_id})
       .then(createdRecords => createdRecords[0])
   }

function destroy(review_id){
    return knex("reviews")
    .where({review_id}).del()
}

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview)
    .then(() => knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.*", "critics.*")
    .where({"reviews.review_id": updatedReview.review_id})
    .then((data) => data.map(addCritic)[0]))
}

module.exports = {
    destroy,
    read,
    update
};