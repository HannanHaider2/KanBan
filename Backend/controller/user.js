const user = require("../models/User");
const createUser = async (req, res) => {
    const User = await new user(req.body);
    User.save();
    res.send(User);
}
const getUser = async (req, res) => {
    const User = await user.find();
    res.send(User);
}
const deleteUser = async (req, res) => {
    const User = await user.findByIdAndDelete(req.params.id);
    res.send(User);
}
const updateUser = async (req, res) => {
    const User = await user.findByIdAndUpdate(req.params.id, req.body);
    res.send(User);
}
const Login = async (req, res) => {
    const User = user.find({ userPassword: req.body.password, userEmail: req.body.email });
    if (User) {
        res.send("Login Successfully");
    }
    else {
        res.status(404).json({
            message: "Login Failed - Invalid username or password"
        })
    }
}
module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    Login
}