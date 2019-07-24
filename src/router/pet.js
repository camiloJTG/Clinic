const express = require('express');
const router = express.Router();
const petController = require('../controller/petController');

router.get('/add', petController.addView);
router.post('/add', petController.add);
router.get('/list', petController.list);
router.get('/delete/:id', petController.delete);
router.get('/edit/:id', petController.idEdit);
router.post('/edit/:id', petController.edit);

module.exports = router;