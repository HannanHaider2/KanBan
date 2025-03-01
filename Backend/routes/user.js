const express = require('express');
const router = express.Router();
const { createUser, getUser, deleteUser, updateUser, getUserId } = require("../controller/User");

router.post('/create', createUser)
router.get('/get', getUser)
router.get('/get/:id', getUserId)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)

module.exports = router;