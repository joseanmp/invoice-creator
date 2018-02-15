const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const clientModel = new Schema({
    name : String,
    km : Number
});

module.exports = mongoose.model('Client',clientModel);
