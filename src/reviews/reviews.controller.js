const service = require("./reviews.service");

async function validateReviewIdExists(req, res, next){
    const review = await service.read(req.params.reviewId)
    if(review){
        res.locals.review = review
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

async function update(req, res, next){
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    res.json({data})
}

module.exports = {
    delete: [validateReviewIdExists, destroy],
    update: [validateReviewIdExists, update]
};