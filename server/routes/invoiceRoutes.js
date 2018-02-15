const express = require('express');

const invoiceRoutes = (Invoice) => {
  const invoiceRouter = express.Router();

  invoiceRouter.route('/')
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
    })

    invoiceRouter.route('/:invoiceId')
      .get((req,res) => {
        Invoice.findById(req.params.invoiceId, (err, invoice) => {
            if(err){
              res.status(500).send(err);
            }
            else res.json(invoice);
        });
      });

      return invoiceRouter;
}

module.exports = invoiceRoutes;
