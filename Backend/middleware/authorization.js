const jwt = require("jsonwebtoken");
const authorization = (req, res, next) => {
    const header = req.header("Authorization");
    if (!header || !header.startsWith("Bearer")) {
        return res.status(404).json({ message: "Access Denied" });
    }
    const token = header.split(" ")[1];
    try {
        const decode = jwt.verify(token, "secret");
        req.user = decode;
        next();
    }
    catch (err) {
        res.status(404).json({ message: "Invalid Token" })
    }
}
module.exports = authorization;