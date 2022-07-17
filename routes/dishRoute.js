const express = require('express');
const bodyparser = require('body-parser');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route("/")
// .all((request,response,next)=>{
//     response.statusCode = 200;
//     response.setHeader('Content-Type','text/plain');
//     next();
// })
.get((request,response,next)=>{
    //response.end("This is get request");
    Dishes.find({})
    .then((dish)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dish);
    });
})
.post((request,response,next)=>{
    //response.end("This is pose");
    Dishes.create(request.body)
    .then((dish)=>{
        response.sendStatus = 200;
        response.setHeader("Content-Type","application/json");
        response.json(dish);
    })
})
.put((request,response,next)=>{
    response.sendStatus = 403;
    response.end("This is put");
})
.delete((request,response,next)=>{
    //response.end("THis is response");
    Dishes.remove({})
    .then((dish)=>{
        response.sendStatus = 200;
        response.setHeader("Content-Type","application/json");
        response.json(dish);
    })
});

dishRouter.route("/:dishId")
.get((request,response,next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        response.sendStatus = 200;
        response.setHeader("Content-Type","application/json");
        response.json(dish);
    })
})
.post((request,response,next)=>{
    response.end("This is pose dishId");
})
.put((request,response,next)=>{
    Dishes.findByIdAndUpdate(request.params.dishId,{$set: request.body},{new:true})
    .then((dish)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dish);
    })
    //response.end("This is put dishId");
})
.delete((request,response,next)=>{
    //response.end("THis is response dishId");
    Dishes.findByIdAndRemove(request.params.dishId)
    .then((dish)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dish);
    })
});

module.exports = dishRouter;