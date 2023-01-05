const express = require('express');
const hellowRouter = require('./helloRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/', hellowRouter);
router.use('/user/', userRouter);

module.exports = router;
