const logger = require("../models/logger");
const getLogger = async (req, res) => {
    try {
        const log = (await logger.find().populate('createBy', 'userName'));
        if (!log) {
            res.status(404).json({
                message: "No logs found"
            })
        }
        else {
            res.status(200).json({
                log,
                message: "log created successfully"
            })
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}
module.exports = {
    getLogger,
}