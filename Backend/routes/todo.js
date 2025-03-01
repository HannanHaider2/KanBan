const express = require('express');
const router = express.Router();
const { createTodo, getTodo, deleteTodo, updateTodo } = require("../controller/todo")

router.post('/create', createTodo)
router.get('/get', getTodo)
router.delete('/delete/:id', deleteTodo)
router.put('/update/:id', updateTodo)

module.exports = router;