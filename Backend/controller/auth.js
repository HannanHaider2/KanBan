const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({
                message: "User Does Not Exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect userName Password",
            });
        }
        const accessToken = jwt.sign({ userName: user.userName, id: user.id }, 'secret');
        return res.status(200).json({
            accessToken: accessToken,
            message: "Login Success",
        });
    } catch (error) {
        console.error(error)
        res.status(401).json({
            message: "Invalid User"
        })
    }
}
const signup = async (req, res) => {
    try {
        console.log("Signup Request Body:", req.body);
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "Invalid userName or password" });
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({ userName, password: hashedPassword });

        await user.save();
        res.status(200).json({ message: "Signup Success" })
    }
    catch (err) {
        console.error(err);
        res.status(401).json({
            message: "Invalid User"
        })
    }
}
module.exports = {
    login,
    signup
}