const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: String,
    
    email: { type: String }

})
const user = mongoose.model("User", userSchema)
module.exports = user;