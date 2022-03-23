const router = require("express").Router()
const { isAuthenticatedUser } = require("../utils/checkAuth")
const { createNewPost, timeLine, getPostLikes, updatePost, deletePost, getPostDetails, likeDisLikePost, commentOnPost, getPostComments, deleteComment, replyOnComment, deleteReplyComment } = require("../controllers/postController")
//create post
router.post("/newpost", isAuthenticatedUser, createNewPost)
//get all timeline post
router.get("/timeline", isAuthenticatedUser, timeLine)
router.get("/likes/:id", isAuthenticatedUser, getPostLikes)
//get single post
router.get("/:id", isAuthenticatedUser, getPostDetails)
router.get("/getcomments/:id", isAuthenticatedUser, getPostComments)
//update post
router.put("/update/:id", isAuthenticatedUser, updatePost)
//like dislike
router.put("/like/:id", isAuthenticatedUser, likeDisLikePost)
router.put("/comment/:id", isAuthenticatedUser, commentOnPost)
router.put("/replyon/:postId/comment/:commentId",isAuthenticatedUser,replyOnComment)
//delete post
router.delete("/delete/:id", isAuthenticatedUser, deletePost)
router.delete("/comment/delete", isAuthenticatedUser, deleteComment)
router.delete("/comment/reply/delete", isAuthenticatedUser, deleteReplyComment)

module.exports = router