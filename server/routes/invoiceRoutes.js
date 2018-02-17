const express = require('express');

const invoiceRoutes = (Invoice) => {
  const invoiceRouter       = express.Router(),
        invoiceController   = require('../controllers/invoiceController')(Invoice);

  invoiceRouter.use('/:invoiceId', invoiceController.findInvoiceMiddleware);

  invoiceRouter.route('/')
    .post(invoiceController.postInvoice)
    .get(invoiceController.getInvoices);

  invoiceRouter.route('/:invoiceId')
    .get(invoiceController.getInvoiceById)
    .patch(invoiceController.patchInvoiceById)
    .delete(invoiceController.deleteInvoiceById);

  invoiceRouter.route('/:invoiceId/records')
    .post(invoiceController.postRecord)

  invoiceRouter.route('/:invoiceId/records/:recordId')
    .patch(invoiceController.patchRecordById)

      return invoiceRouter;
}

module.exports = invoiceRoutes;
