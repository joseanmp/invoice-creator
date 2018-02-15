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
      });

    return rateRouter;
}

module.exports = rateRoutes;
