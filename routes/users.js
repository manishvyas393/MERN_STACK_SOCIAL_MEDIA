const router = require("express").Router()
const { isAuthenticatedUser } = require("../utils/checkAuth")
const { searchUser, loggedUserPosts, loggedUserProfile, getOtherUserProfile, updateBasicProfileDetails, updatePersonelDetails, uploadProfilePic, setProfileStatus, deleteUser } = require("../controllers/userController")
const { followUnfollow, acceptRequest, cancelRequest,removeFollower } = require("../controllers/followUnfollowController")
const { resetLink } = require("../controllers/auth")

router.get("/getuser",isAuthenticatedUser, searchUser)
//get logged user posts
router.get("/posts", isAuthenticatedUser, loggedUserPosts)
router.get("/profile", isAuthenticatedUser, loggedUserProfile)
router.get("/:username", isAuthenticatedUser, getOtherUserProfile)
router.put("/updateprofile/:id", isAuthenticatedUser, updateBasicProfileDetails)
router.put("/updatepersonelinfo/:id", isAuthenticatedUser, updatePersonelDetails)
router.put("/follow/:id", isAuthenticatedUser, followUnfollow)
router.put("/accept-follow-request/:id", isAuthenticatedUser, acceptRequest)
router.put("/profilepic", isAuthenticatedUser, uploadProfilePic)
router.put("/setstatus", isAuthenticatedUser, setProfileStatus)
router.delete("/remove/follower/:id", isAuthenticatedUser, removeFollower)
router.delete("/delete/:id", isAuthenticatedUser, deleteUser)
router.delete("/cancel-follow-request/:id", isAuthenticatedUser, cancelRequest)

module.exports = router