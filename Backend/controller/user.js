const user = require("../models/User");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(404).json({
                message: "Required userName and password"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const User = new user({ userName, password: hashPass });
        await User.save();
        res.json(User);
    }
    catch (err) {
        console.error(err)
        res.status(401).json({
            message: "Invalid User"
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
        res.status(401).json({
            message: "Invalid User"
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
        res.status(401).json({
            message: "No User Id"
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
        res.status(401).json({
            message: "No User Id"
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
        res.status(401).json({
            message: "Invalid"
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