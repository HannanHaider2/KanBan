const { default: mongoose } = require("mongoose")
const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["ToDo", "In progress", "Done"]
    }
})
const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
