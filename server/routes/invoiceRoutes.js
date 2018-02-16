const express = require('express');

const invoiceRoutes = (Invoice) => {
  const invoiceRouter = express.Router();

  invoiceRouter.route('/')
    .post((req,res) => {
        let invoice = new Invoice(req.body);
        if(req.body.invoiceNumber && req.body.date){
            invoice.save();
            res.status(201).send(invoice);
        }
        else res.status(400).send('Missing parameters');
    })
    .get((req,res) => {
        let query = {};
        if(req.query.invoiceNumber){
          query.invoiceNumber = req.query.invoiceNumber;
        }
        Invoice.find(query, (err, invoices) => {
          if(err){
            res.status(500).send(err);
          }
          else res.json(invoices);
        })
    });

    invoiceRouter.use('/:invoiceId', (req, res, next) => {
        Invoice.findById(req.params.invoiceId, (err, invoice) => {
            if(err){
              res.status(500).send(err);
            }
            else if(invoice){
              req.invoice = invoice;
              next();
            }
            else res.status(404).send('No invoice found');
        });
    });

    invoiceRouter.route('/:invoiceId')
      .get((req,res) => {
        res.json(req.invoice);
      })
      .patch((req,res) => {
        if(req.body._id){
          delete req.body._id;
        }
        for(let invoiceProperty in req.body){
          //Update properties !== records
          if(invoiceProperty !== 'records'){
            req.invoice[invoiceProperty] = req.body[invoiceProperty];
          }
          //Check objects inside records property
          else{
            for(let recordProperty in req.body.records){
                //Exist so update
                if(req.body.records[recordProperty]._id){
                  let objFound = req.invoice.records.find((obj) => {
                      return obj._id == req.body.records[recordProperty]._id;
                  });
                  delete req.body.records[recordProperty]._id;
                  for(let property in req.body.records[recordProperty]){
                      objFound[property] = req.body.records[recordProperty][property];
                  }
                }
                //Doesn't exist so add
                else{
                  req.invoice.records.push(req.body.records[recordProperty]);
                }
            }
          }
        }
        req.invoice.save((err) => {
            if(err){
              res.status(500).send(err);
            }
            else res.json(req.invoice);
        });
      })
      .delete((req,res) => {
          req.invoice.remove((err) => {
              if(err){
                res.status(500).send(err);
              }
              else res.status(204).send('Invoice removed');
          })
      })
      /*
      .patch((req,res) => {
        if(req.body._id){
          delete req.body._id;
        }
        for(let invoiceProperty in req.body){
          if(invoiceProperty !== 'records'){
            req.invoice[invoiceProperty] = req.body[invoiceProperty];
          }
        }
        req.invoice.save((err) => {
            if(err){
              res.status(500).send(err);
            }
            else res.json(req.invoice);
        });
      });

      invoiceRouter.route('/:invoiceId/records')
        .post((req,res) => {})

      invoiceRouter.route('/:invoiceId/records/:recordId')
          .patch((req,res) => {})
        */

      return invoiceRouter;
}

module.exports = invoiceRoutes;
