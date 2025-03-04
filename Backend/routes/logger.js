const express = require("express")
const router = express.Router();
const { getLogger } = require("../controller/logger")

router.get('/get', getLogger);
module.exports = router;
