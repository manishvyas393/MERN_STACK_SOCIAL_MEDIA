const router = require("express").Router()
const { isAuthenticatedUser } = require("../utils/checkAuth")
const { loginControl, createAccountControl, logoutController, updatePassword, resetLink } = require("../controllers/auth")
router.post("/register", createAccountControl)
router.post("/login",loginControl)
router.get("/logout", isAuthenticatedUser, logoutController)
router.put("/requestresetlink", resetLink)
router.put("/resetpassword/:token",updatePassword)
module.exports = router