const router = require("express").Router()
const { acessChat, fetchChats, singleChat } = require("../controllers/chatController")
const { isAuthenticatedUser } = require("../utils/checkAuth")
router.post("/createchat/:id", isAuthenticatedUser, acessChat)
router.get("/getchats", isAuthenticatedUser, fetchChats)
router.get("/singlechat/:chatId",isAuthenticatedUser,singleChat)
module.exports=router