if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")

app.use("/movies", moviesRouter);

// Not found handler
app.use((req, res, next) => {
    res.send(`The route ${req.originalUrl} does not exist!`)
})

// Error handling
app.use((error, req, res, next) => {
    const { status = 500, message = `Internal server error`} = error;
    res.status(status).send(message)
})

module.exports = app;
