const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller'); 
router.get('/numbers/:numberid', controller.getNumber); 

module.exports = router;