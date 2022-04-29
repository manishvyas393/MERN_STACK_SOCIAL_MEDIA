const { sendMessage, getAllMessages } = require("../controllers/messageControllers")
const { isAuthenticatedUser } = require("../utils/checkAuth")
const router = require("express").Router()
router.post("/sendmessage/:id", isAuthenticatedUser, sendMessage)
router.get("/getmessages/:id",isAuthenticatedUser,getAllMessages)
module.exports=router