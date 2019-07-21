const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

router.get('/listClient', clientConstroller.list);

module.exports = router;