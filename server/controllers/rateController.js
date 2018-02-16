const rateController = (Rate) => {
    const post = (req,res) => {
      console.log(req.body);
      let rate = new Rate(req.body);
      rate.save();
      res.status(201).send(rate);
    }

    const get = (req,res) => {
        Rate.find((err,rates) => {
          if(err){
            res.status(500).send(err);
          }
          else res.json(rates);
        });
    }

    return {
      post: post,
      get: get
    }
}

module.exports = rateController;
