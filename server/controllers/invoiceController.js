const invoiceController = (Invoice) =>{
  const getInvoices = (req,res) => {
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
  }

  const postInvoice = (req,res) => {
    let invoice = new Invoice(req.body);
    if(req.body.invoiceNumber && req.body.date){
        invoice.save();
        res.status(201).send(invoice);
    }
    else res.status(400).send('Missing parameters');
  }

  const findInvoiceMiddleware = (req, res, next) => {
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
  }

  const getInvoiceById = (req,res) => {
    res.json(req.invoice);
  }

  const deleteInvoiceById = (req,res) => {
    req.invoice.remove((err) => {
        if(err){
          res.status(500).send(err);
        }
        else res.status(204).send('Invoice removed');
    })
  }

  const patchInvoiceById = (req,res) => {
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
  }

  const postRecord = (req,res) => {
    if(req.body._id){
      delete req.body._id;
    }
    req.invoice.records.push(req.body);
    req.invoice.save((err) => {
        if(err){
          res.status(500).send(err);
        }
        else res.json(req.invoice);
    });
  }

  const patchRecordById = (req,res) => {
    if(req.body._id){
      delete req.body._id;
    }
    let objFound = req.invoice.records.find((obj) => {
        return obj._id == req.params.recordId;
    });
    for(let property in req.body){
        objFound[property] = req.body[property];
    }
    req.invoice.save((err) => {
        if(err){
          res.status(500).send(err);
        }
        else res.json(req.invoice);
    });
  }

  return {
    getInvoices : getInvoices,
    postInvoice : postInvoice,
    getInvoiceById : getInvoiceById,
    deleteInvoiceById : deleteInvoiceById,
    patchInvoiceById : patchInvoiceById,
    postRecord : postRecord,
    patchRecordById : patchRecordById,
    findInvoiceMiddleware : findInvoiceMiddleware
  }
}

module.exports = invoiceController;
