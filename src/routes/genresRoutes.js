const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.list);
router.get('/:id', genresController.detail);


module.exports = router;