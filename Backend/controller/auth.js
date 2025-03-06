const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!userName || !password) {
            return res.status(400).json({ message: "Enter userName or password Again" });
        }
        if (!user) {
            return res.status(404).json({
                message: "User Does Not Exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect Password",
            });
        }
        const accessToken = jwt.sign({ userName: user.userName, id: user.id }, process.env.SECRET);
        return res.status(200).json({
            accessToken: accessToken,
            message: "Login Successfully",
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}
const signup = async (req, res) => {
    try {
        console.log("Signup Request Body:", req.body);
        const { userName, password, firstName, lastName } = req.body;
        if (!userName || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "Invalid userName or password" });
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({ userName, password: hashedPassword, firstName, lastName });

        await user.save();
        res.status(200).json({ message: "Signup Successfully" })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
module.exports = {
    login,
    signup
}