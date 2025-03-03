const express = require('express');
const router = express.Router();
const { createTodo, getTodo, deleteTodo, updateTodo } = require("../controller/todo");
const authorization = require('../middleware/authorization');

router.post('/create', authorization, createTodo)
router.get('/get', authorization, getTodo)
router.delete('/delete/:id', authorization, deleteTodo)
router.patch('/update/:id', authorization, updateTodo)

module.exports = router;