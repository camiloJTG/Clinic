const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

router.get('/list', clientConstroller.list);
router.get('/add', clientController.addView);
router.post('/add', clientController.add);
router.get('/delete/:id', clientController.delete);

module.exports = router;