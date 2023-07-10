const service = require("./movies.service")

async function list(req, res, next){
    const is_showing = req.query.is_showing
    if(is_showing && is_showing === "true"){
        const data = await service.listIsShowing()
        res.json({data})
    }else{
        const data = await service.list()
        res.json({data})
    }
}

async function read(req, res, next){
    const {movieId} = req.params
    const data = await service.read(movieId)
    res.json({data})
}

async function validateMovieIdExists(req, res, next){
    const movie = await service.read(req.params.movieId)
    if(movie){
        next()
    }else{
        next({
            status: 404,
            message: { error: "Movie cannot be found." }
        })
    }
}

async function readTheatersForMovieId(req, res, next){
    const {movieId} = req.params
    const data = await service.readTheatersForMovieId(movieId)
    res.json({data})
}

async function readReviewsForMovieId(req, res, next){
    const {movieId} = req.params
    const data = await service.readReviewsForMovieId(movieId)
    res.json({data})
}

module.exports = {
    list,
    read: [validateMovieIdExists, read],
    readTheatersForMovieId:[validateMovieIdExists, readTheatersForMovieId],
    readReviewsForMovieId: [validateMovieIdExists, readReviewsForMovieId]
}