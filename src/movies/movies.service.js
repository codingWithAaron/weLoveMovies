const knex = require("../db/connection");

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

module.exports = {
    list,
    listIsShowing
};