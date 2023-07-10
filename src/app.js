if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router")

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter)

// Not found handler
app.use((req, res, next) => {
    res.status(404).json({ error: `Path not found: ${req.originalUrl}` });
})

// Error handling
app.use((error, req, res, next) => {
    const { status = 500, message = `Internal server error`} = error;
    res.status(status).send(message);
})

module.exports = app;
