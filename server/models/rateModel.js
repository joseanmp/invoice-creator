const mongoose = require('mongoose');

const rateModel = mongoose.Schema({
    rate: Number
});

module.exports = mongoose.model('Rate', rateModel);
