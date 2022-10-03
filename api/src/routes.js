const express = require('express');
const clinicianController = require('./controllers/clinicianController');
const facilitiesController = require('./controllers/facilitiesController');
const queryController = require('./controllers/queryController');

const routes = express.Router();

routes.get('/facilities', facilitiesController.index);
routes.get('/clinician-work-history/:id', clinicianController.index);
routes.get('/query/4', queryController.index4);
routes.get('/query/5', queryController.index5);
routes.get('/query/6', queryController.index6);

module.exports = routes;