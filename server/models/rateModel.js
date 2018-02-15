const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const rateModel = new Schema({
    rate: Number
});

module.exports = mongoose.model('Rate', rateModel);
