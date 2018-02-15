const mongoose = require('mongoose');

const invoiceModel = mongoose.Schema({
    invoiceNumber : Number,
    date          : Date,
    record        : [
                      {
                        date      : Date,
                        client    : String,
                        weight    : Number,
                        rate      : Number,
                        distance  : Number,
                        amount    : Number
                      }
                    ]
});

module.exports = mongoose.model('Invoice', invoiceModel);
