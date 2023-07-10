const knex = require("../db/connection");

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

module.exports = {
    destroy,
    read
};