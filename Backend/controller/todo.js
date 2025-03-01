const todo = require("../models/todo");
const createTodo = async (req, res) => {
    try {
        const { Title, Desc, Status } = req.body;
        const userId = req.user.id;
        const Todo = await new todo({ Title, Desc, Status, userId });
        Todo.save();
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
        const userId = req.params.id
        const Todo = await todo.findById(req.params);
        if (!Todo) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.userId.toString() !== userId) {
            return res.status(403).json({ message: "Can't Delete this task" });
        }
        await todo.findByIdAndDelete(req.params);
        res.status(201).json({ message: "Task deleted successfully" });
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
        const { Title, Desc, Status } = req.body;
        const userId = req.params.id;
        const Todo = await todo.findById(req.params);

        if (!Todo) {
            return res.status(404).json({ message: "Couldn't find Task" });
        }
        if (todo.userId.toString() !== userId) {
            return res.status(403).json({ message: "Can't update this task" })
        }
        const updateTodo = await user.findByIdAndupdate(userId, { Title, Desc, Status }, { new: true })
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