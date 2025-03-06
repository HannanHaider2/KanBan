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
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Todo", "Inprogress", "Done"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
