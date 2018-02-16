const express = require('express');

const clientRoutes = (Client) => {
    const clientRouter = express.Router();

    clientRouter.route('/')
      .post((req,res) => {
          let client = new Client(req.body);
          if(req.body.name && req.body.km !== undefined){
            client.save((err) => {
              if(err){
                res.status(500).send(err);
              }
              else res.status(201).send(client);
            });
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

      clientRouter.use('/:clientId', (req, res, next) => {
        Client.findById(req.params.clientId, (err, client) => {
          if(err){
            res.status(500).send(err);
          }
          else if(client){
            req.client = client;
            next();
          }
          else res.status(404).send('No client found');
        });
      });

      clientRouter.route('/:clientId')
        .get((req,res) => {
            res.json(req.client);
        })
        .put((req,res) => {
            req.client.name = req.body.name;
            req.client.km   = req.body.km;
            if(req.client.name && req.client.km !== undefined){
              req.client.save((err) => {
                if(err){
                  res.status(500).send(err);
                }
                else res.json(req.client);
              });
            }
            else res.status(400).send('Missing parameters');
        })
        .patch((req,res) =>{
            if(req.body._id){
              delete req.body._id;
            }
            for(let property in req.body){
                req.client[property] = req.body[property];
            }
            req.client.save((err) => {
                if(err){
                  res.status(500).send(err);
                }
                else res.json(req.client);
            });
        })
        .delete((req,res) => {
            req.client.remove((err) => {
              if(err){
                res.status(500).send(err);
              }
              else res.status(204).send('Client removed');
            })
        });

      return clientRouter;
}

module.exports = clientRoutes;
