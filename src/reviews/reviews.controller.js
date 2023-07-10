const service = require("./reviews.service");

async function validateReviewIdExists(req, res, next){
    const review = await service.read(req.params.reviewId)
    if(review){
        next()
    }else{
        next({
            status: 404,
            message: { error: "Review cannot be found." }
        })
    }
}

async function destroy(req, res, next){
    const {reviewId} = req.params
    await service.destroy(reviewId)
    res.sendStatus(204)
}

module.exports = {
    delete: [validateReviewIdExists, destroy]
};