const mongoose = require('mongoose');

const logger = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    todoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todo"
    },
    oldStatus: {
        type: String,
        enum: ["ToDo", "In progress", "Done"]
    },
    newStatus: {
        type: String,
        enum: ["ToDo", "In progress", "Done"]
    },
    action: {
        type: String,
        enum: ["create", "update", "delete"]
    },
    time: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("logger", logger)