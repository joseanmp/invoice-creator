const express = require('express');

const clientRoutes = (Client) => {
    const clientRouter      = express.Router(),
          clientController  = require('../controllers/clientController')(Client);

    clientRouter.use('/:clientId', clientController.findClientMiddleware);

    clientRouter.route('/')
      .post(clientController.postClient)
      .get(clientController.getClients);
      
    clientRouter.route('/:clientId')
      .get(clientController.getClientById)
      .put(clientController.putClientById)
      .patch(clientController.patchClientById)
      .delete(clientController.deleteClientById);

      return clientRouter;
}

module.exports = clientRoutes;
