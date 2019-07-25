const express = require('express');
const router = express.Router();
const typeAnimalController = require('../controller/typeAnimalController');

router.get('/list', typeAnimalController.list);
router.get('/add', typeAnimalController.addView);
router.post('/add', typeAnimalController.add);
router.get('/delete/:id', typeAnimalController.delete);
router.get('/edit/:id', typeAnimalController.editView);
router.post('/edit/:id', typeAnimalController.edit);

module.exports = router;
