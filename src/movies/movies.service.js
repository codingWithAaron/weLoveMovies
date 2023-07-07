const knex = require("../db/connection");

function list(){
    const is_showing = req.query.is_showing
    if( is_showing && is_showing === "true"){
        return knex("movies")
        .select("*")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .where({is_showing: true})
    }else{
        return knex("movies").select("*")
    }
}

module.exports = {
    list
};