const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(){
    return knex("movies").select("*")
}

function listIsShowing(){
    return knex("movies as m")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .join("movies_theaters", "m.movie_id", "movies_theaters.movie_id")
        .where({"movies_theaters.is_showing": true})
        .groupBy("m.movie_id");
}

function read(movie_id){
 return knex("movies")
    .select("*")
    .where({movie_id: movie_id})
    .then(createdRecords => createdRecords[0])
}

function readTheatersForMovieId(movie_id){
    return knex("theaters")
    .select("*")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .where({"movies_theaters.movie_id": movie_id})
    .where({"movies_theaters.is_showing": true})
}

const addCritic = mapProperties({
        critic_id: "critic.critic_id",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
        created_at: "critic.created_at",
        updated_at: "critic.updated_at"
})

function readReviewsForMovieId(movie_id){
    return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.*", "critics.*")
    .where({"reviews.movie_id": movie_id})
    .then((data) => data.map(addCritic))
}

module.exports = {
    list,
    listIsShowing,
    read,
    readTheatersForMovieId,
    readReviewsForMovieId
};