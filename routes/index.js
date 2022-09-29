var express = require('express');
var router = express.Router();

const missionRouter = require("./mission.api.js")
router.use("/mission",missionRouter)
const userRouter = require("./user.api.js")
router.use("/users",userRouter)
module.exports = router;
