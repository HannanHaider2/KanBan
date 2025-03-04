const logger = require("../models/logger");
const getLogger = async (req, res) => {
    try {
        const Logger = await logger.find();
        if (!Logger) {
            res.status(404).json({
                message: "No logger found"
            })
        }
        else {
            res.status(200).json({
                Logger,
                message: "success"
            })
        }
    }
    catch (err) {
        console.error(err)
        res.status(401).json({
            message: "Failed"
        })
    }
}
module.exports = {
    getLogger,
}