const express = require('express');
const router = express.Router();
const { userController } = require('./../controller');

router.post('/create', userController.addUser);
router.put('/update', userController.updateUserById);
router.delete('/delete/:id', userController.deleteUserById);
router.get('/getUserByUsername', userController.getUserByUsername);
module.exports = router;
