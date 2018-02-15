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
        //for(let property in req.body)
      })

      return invoiceRouter;
}

module.exports = invoiceRoutes;
