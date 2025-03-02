const todo = require("../models/todo");
const createTodo = async (req, res) => {
    try {
        const { title, desc, status } = req.body;
        const userId = req.user.id;
        const Todo = new todo({ title, desc, status, userId });

        await Todo.save();
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
        if (Todo.userId.toString() !== userId) {
            return res.status(404).json({ message: "Todo Deletion Not Allowed" });
        }

        await todo.findByIdAndDelete(req.params.id);
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
        const { title, desc, status } = req.body;
        const userId = req.user.id;
        const Todo = await todo.findById(req.params.id);


        if (!Todo) {
            return res.status(404).json({ message: "Couldn't find Todo" });
        }
        if (Todo.userId.toString() !== userId) {
            return res.status(404).json({ message: "Couldn't update Todo " });
        }
        const updateTodo = await user.findByIdAndupdate({ title, desc, status }, { new: true })
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