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

module.exports = {
    list
}