const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesController');

/* API/MOVIES */
router.get('', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);
router.post('/create', moviesController.create);
router.delete('/delete/:id', moviesController.destroy);

module.exports = router;