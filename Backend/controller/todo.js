const todo = require("../models/todo");
const logger = require("../models/logger");
const createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user.id;
        const Todo = new todo({ title, description, status, userId });

        await Todo.save();

        const log = new logger({
            createBy: userId,
            todoId: Todo.id,
            oldStatus: null,
            newStatus: status,
            action: "create",
            createdAt: new Date
        });
        await log.save();
        res.status(201).json(Todo);
    }
    catch (err) {
        console.error(err)
        res.status(401).json({
            message: "Creation Failed"
        })
    }

}
const getTodo = async (req, res) => {
    try {
        const Todo = await todo.find().populate('userId');
        res.send(Todo);
    }
    catch (err) {
        console.error(err)
        res.status(401).json({
            message: "Failed"
        })
    }
}
const deleteTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const Todo = await todo.findById(req.params.id);
        if (!Todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await todo.findByIdAndDelete(req.params.id);

        const log = new logger({
            createBy: userId,
            todoId: Todo.id,
            oldStatus: Todo.status,
            newStatus: null,
            action: "delete"
        });
        await log.save();

        res.status(201).json({ message: "Todo deleted successfully" });
    }
    catch (err) {
        console.error(err)
        res.status(401).json({
            message: "Try Again"
        })
    }
}
const updateTodo = async (req, res) => {
    try {

        const { title, description, status } = req.body;
        const userId = req.user.id;
        const Todo = await todo.findById(req.params.id);
        if (!Todo) {
            return res.status(404).json({ message: "Couldn't find Todo" });
        }
        const updateTodo = await todo.findByIdAndUpdate(Todo, { title, description, status }, { new: true });

        if (updateTodo) {
            const log = new logger({
                createBy: userId,
                todoId: updateTodo.id,
                oldStatus: Todo.status,
                newStatus: status,
                action: "update",
                updatedAt:new Date
            });
            await log.save();
        }

        res.status(200).json(updateTodo);
    }

    catch (err) {
        console.error(err)
        res.status(401).json({
            message: "Try Again"
        })
    }
}

module.exports = {
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo
}