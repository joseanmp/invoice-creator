const express = require('express');

const rateRoutes = (Rate) => {
    const rateRouter = express.Router();

    rateRouter.route('/')
      .get((req,res) => {
          Rate.find((err,rates) => {
            if(err){
              res.status(500).send(err);
            }
            else res.json(rates);
          });
      })
      .post((req,res) => {
        console.log(req.body);
        let rate = new Rate(req.body);
        rate.save();
        res.status(201).send(rate);
      });

    return rateRouter;
}

module.exports = rateRoutes;
