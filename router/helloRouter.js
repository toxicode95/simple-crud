const express = require('express');
const { helloController } = require('./../controller');

const router = express.Router();
router.get('/hello', helloController.helloWorld);

module.exports = router;
