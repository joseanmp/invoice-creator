const express     = require('express'),
      mongoose    = require('mongoose'),
      bodyParser  = require('body-parser');

const db            = mongoose.connect('mongodb://localhost/invoiceAPI');
      app           = express(),
      port          = process.env.PORT || 3000,
      Rate          = require('./models/rateModel'),
      Client        = require('./models/clientModel'),
      Invoice       = require('./models/invoiceModel'),
      invoiceRouter = require('./routes/invoiceRoutes')(Invoice),
      clientRouter  = require('./routes/clientRoutes')(Client),
      rateRouter    = require('./routes/rateRoutes')(Rate);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/invoices', invoiceRouter);
app.use('/api/clients', clientRouter);
app.use('/api/rates', rateRouter);

app.listen(port, () => {
    console.log('Gulp is running on port ' + port);
});
