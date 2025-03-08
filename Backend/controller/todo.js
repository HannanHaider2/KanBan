const todo = require("../models/todo");
const logger = require("../models/logger");
const createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user.id;
        const task = new todo({ title, description, status, userId });

        await task.save();

        const log = new logger({
            createBy: userId,
            todoId: task.id,
            oldStatus: null,
            newStatus: status,
            action: "create",
            createdAt: new Date
        });
        await log.save();
        res.status(201).json(task);
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
        const task = await todo.find().populate('userId');
        res.send(task);
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
        const task = await todo.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await todo.findByIdAndDelete(req.params.id);

        const log = new logger({
            createBy: userId,
            todoId: task.id,
            oldStatus: task.status,
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
        const task = await todo.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Couldn't find Todo" });
        }
        const updateTodo = await todo.findByIdAndUpdate(task, { title, description, status }, { new: true });

        if (updateTodo) {
            const log = new logger({
                createBy: userId,
                todoId: updateTodo.id,
                oldStatus: task.status,
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