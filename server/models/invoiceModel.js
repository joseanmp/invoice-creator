const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const invoiceModel = new Schema({
    invoiceNumber : Number,
    date          : Date,
    records       : [
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
