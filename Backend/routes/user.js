const express = require('express');
const router = express.Router();
const { createUser, getUser, deleteUser, updateUser, Login } = require("../controller/User");

router.post('/create', createUser)
router.get('/get', getUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)
router.post('/login', Login)

module.exports = router;