const mongoose = require('mongoose');

const clientModel = mongoose.Schema({
    name: String,
    km: Number
});

module.exports = mongoose.model('Client',clientModel);
