const express = require('express');

const clientRoutes = (Client) => {
    const clientRouter = express.Router();

    clientRouter.route('/')
      .post((req,res) => {
          let client = new Client(req.body);
          if(req.body.name && req.body.km){
            client.save();
            res.status(201).send(client);
          }
          else res.status(400).send('Missing parameters');
      })
      .get((req,res) => {
          let query = {};
          if(req.query.name){
            query.name = new RegExp('^' + req.query.name);
          }
          Client.find(query, (err, clients) => {
            if(err){
              res.status(500).send(err);
            }
            else res.json(clients);
          });
      });

      return clientRouter;
}

module.exports = clientRoutes;
