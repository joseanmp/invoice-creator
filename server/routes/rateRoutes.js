const express = require('express');

const rateRoutes = (Rate) => {
    const rateRouter      = express.Router(),
          rateController  = require('../controllers/rateController')(Rate);

    rateRouter.route('/')
      .get(rateController.get)
      .post(rateController.post);

    return rateRouter;
}

module.exports = rateRoutes;
