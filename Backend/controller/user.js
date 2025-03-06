const user = require("../models/User");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
    try {
        const { userName, password, firstName, lastName } = req.body;
        if (!userName || !password || !firstName || !lastName) {
            res.status(404).json({
                message: "Required userName or password or firstName or lastName"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const User = new user({ userName, firstName, lastName, password: hashPass });
        await User.save();
        res.json(User);
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Server error"
        })
    }

}
const getUser = async (req, res) => {
    try {
        const User = await user.find();
        res.json(User);
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Server error"
        })
    }

}

const getUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const User = await user.findById(id);

        if (!User) {
            res.status(404).json({ message: "Invalid User" });
        } else {
            res.json(User);
        }
    } catch (error) {
        console.error(err)
        res.status(500).json({
            message: "Server error"
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const User = await user.findByIdAndDelete(req.params.id);
        if (!User) {
            res.status(404).json({ message: "User Not Found" })
        }
        res.json({ message: "User Deleted", User });
    }
    catch (error) {
        console.error(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}
const updateUser = async (req, res) => {
    try {
        const User = await user.findByIdAndUpdate(req.params.id, req.body);
        if (!User) {
            res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", User });
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


module.exports = {
    createUser,
    getUserId,
    getUser,
    deleteUser,
    updateUser
}