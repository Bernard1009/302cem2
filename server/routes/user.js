const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addorder', userController.form);
router.post('/addorder', userController.create);
router.get('/editorder/:id', userController.edit);
router.post('/editorder/:id', userController.update);
router.get('/vieworder/:id', userController.viewall);
router.get('/:id',userController.delete);
  
module.exports = router;