const knex = require("../db/connection");

function list(){
    return knex("movies").select("*")
}

function listIsShowing(){
    return knex("movies")
        .select("*")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .where({is_showing: true})
}

module.exports = {
    list,
    listIsShowing
};