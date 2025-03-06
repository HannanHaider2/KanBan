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
        enum: ["Todo", "Inprogress", "Done"]
    },
    newStatus: {
        type: String,
        enum: ["Todo", "Inprogress", "Done"]
    },
    action: {
        type: String,
        enum: ["create", "update", "delete"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("logger", logger)