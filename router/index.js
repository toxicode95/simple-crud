const express = require('express');
const hellowRouter = require('./helloRouter');

const router = express.Router();

router.use('/', hellowRouter);

module.exports = router;
