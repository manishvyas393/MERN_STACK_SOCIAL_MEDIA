const User = require("../model/user")
const Post = require("../model/posts")
const cloudinary = require("cloudinary").v2
const crypto = require("crypto")
exports.createNewPost = async (req, res, next) => {
      try {
            const { desc } = req.body
            let image = req.files.postImage
            const myCloud = await cloudinary.uploader.upload(image.tempFilePath, {
                  folder: "fbProfilePic",
                  width: 250,
            }, function (err, result) {
                  console.log(err)
                  console.log(result)
            });
            console.log(myCloud)
            const newPost = new Post({
                  userId: req.user.id,
                  desc,
                  img: {
                        public_id: myCloud.public_id,
                        url: myCloud.url
                  }
            })
            const savePost = await newPost.save()
            res.status(200).json({
                  success: true,
                  post: savePost
            })

      } catch (error) {
            res.status(500).json({
                  error: error
            })
      }

}
exports.timeLine = async (req, res, next) => {
      const loggedUser = await User.findById(req.user.id)
      const post = await Post.find({ userId: req.user.id }).populate("userId", "_id username  profilePicture.url")
      const friendsPost = await Promise.all(
            loggedUser.followings.map(friend => {
                  return Post.find({ userId: friend.user }).populate("userId", "_id username  profilePicture.url")
            })
      )
      if (post) {
            res.status(200).json({
                  timeline: post.concat(...friendsPost)
            })
      }
      else {
            res.status(404).json({
                  success: false,
                  error: "no posts"
            })
      }
}
exports.getPostLikes = async (req, res, next) => {
      const post = await Post.findById(req.params.id).populate("likes.userId", "_id username  profilePicture.url")
      const users = post.likes
      res.status(200).json({
            users
      })
}
exports.updatePost = async (req, res, next) => {
      const post = await Post.findById(req.params.id)
      if (post.userId.toString() === req.user.id) {
            await post.updateOne({ $set: req.body })
            res.status(200).json({
                  updated: true
            })
      }
      else {
            res.status(403).json({
                  updated: false,
                  msg: "you can update only your post"
            });
      }
}
exports.deletePost = async (req, res, next) => {
      const post = await Post.findById(req.params.id)
      if (post.userId.toString() === req.user.id) {
            await post.remove()
            res.status(200).json({
                  deletedPost: true
            })
      }
      else {
            res.status(403).json({
                  deletedPost: false,
                  msg: "you can Delete only your post"
            });
      }
}
exports.getPostDetails = async (req, res, next) => {
      try {
            const post = await Post.findById(req.params.id).populate("userId", "_id username  profilePicture.url").populate("likes.userId", "_id username  profilePicture.url")
            res.status(200).json({
                  post
            })
      } catch (error) {
            res.status(500).json({
                  error: error
            })
      }
}
exports.likeDisLikePost = async (req, res, next) => {
      let liker;
      const post = await Post.findById(req.params.id)
      post.likes.filter((like) => {
            if (like.userId.toString() === req.user.id) {
                  liker = like.userId.toString()
            }
      })
      if (!liker) {
            await post.updateOne({ $push: { likes: { userId: req.user.id } } }).then(() => {
                  res.status(200).json({
                        success: true
                  })
            })
      }
      else {
            await post.updateOne({ $pull: { likes: { userId: req.user.id } } }).then(() => {
                  res.status(200).json({
                        success: false
                  })
            })

      }
}
exports.commentOnPost = async (req, res, next) => {
      let follower;
      const { comment } = req.body
      const post = await Post.findById(req.params.id)
      const user = await User.findById(post.userId)
      var commentId = crypto.randomBytes(16).toString("hex")
      if (user.id === req.user.id) {
            await Post.findByIdAndUpdate(req.params.id, { $push: { comments: { commentId, user: req.user.id, comment, commentedOn: new Date(Date.now()).toString() } } }).then(() => {
                  res.status(200).json({
                        commented: true
                  })
            })
      }
      else if (user.profileStatus === "private") {
            user.followers.map(async f => {
                  if (req.user.id === f.user.toString()) {
                        console.log(req.user.id, f.user.toString())
                        follower = true
                  }
            })
            if (follower) {
                  await Post.findByIdAndUpdate(req.params.id, { $push: { comments: { commentId, user: req.user.id, comment, commentedOn: new Date(Date.now()).toString() } } }).then(data => {
                        if (data) {
                              res.status(200).json({
                                    commented: true,
                              })

                        }
                  })
            }
            else {
                  res.status(403).json({
                        commented: false,
                        msg: "private"
                  })
            }
      }
      else {
            await Post.findByIdAndUpdate(req.params.id, { $push: { comments: { commentId, user: req.user.id, comment, commentedOn: new Date(Date.now()).toString() } } }).then(() => {
                  res.status(200).json({
                        commented: true
                  })
            })
      }
}
exports.getPostComments = async (req, res, next) => {
      const post = await Post.findById(req.params.id, { likes: 0, img: 0 })
            .populate("comments.user", "_id username profilePicture.url")
            .populate("userId", "id username profilePicture.url")
            .populate("comments.replies.replier", "_id username profilePicture.url")
      res.status(200).json({
            post
      })
}
exports.deleteComment = async (req, res, next) => {
      const post = await Post.findById(req.query.postId)
      let commets = post.comments.filter(c => c.commentId.toString() !== req.query.commentId.toString())
      await Post.findByIdAndUpdate(req.query.postId,
            {
                  comments: commets
            }).then(() => {
                  res.status(200).json({
                        deleted: true
                  })
            })
}
exports.replyOnComment = async (req, res, next) => {
      const { reply } = req.body
      let comment
      const post = await Post.findById(req.params.postId)
      const user = await User.findById(post.userId)
      if (user.id === req.user.id) {
            post.comments.map(async (com) => {
                  if (com.commentId === req.params.commentId) {
                        com.replies.push({
                              replyId: crypto.randomBytes(16).toString("hex"),
                              replier: req.user.id,
                              repliedOn: new Date(Date.now()).toString(),
                              reply,
                        })
                        await post.save().then(() => {
                              res.status(200).json({
                                    replied: true
                              })
                        })

                  }
            })
      }
      else if (user.profileStatus === "private") {
            user.followers.map(async f => {
                  if (req.user.id === f.user.toString()) {
                        post.comments.map(async (com) => {
                              if (com.commentId === req.params.commentId) {
                                    comment = req.params.commentId
                                    if (comment) {
                                          com.replies.push({
                                                replyId: crypto.randomBytes(16).toString("hex"),
                                                replier: req.user.id,
                                                repliedOn: new Date(Date.now()).toString(),
                                                reply,
                                          })
                                          await post.save()
                                          res.status(200).json({
                                                replied: true
                                          }) 
                                    }
                                    else {
                                          res.status(404).json({
                                                msg:"not found"
                                          })
                                    }
                               
                              }
                        })
                  }
                  else {
                        res.status(403).json({
                              commented: false,
                              msg: "user account is private cant' comment"
                        })
                  }

            })
      }
      else {
            post.comments.map(async (com) => {
                  if (com.commentId === req.params.commentId) {
                        com.replies.push({
                              replyId: crypto.randomBytes(16).toString("hex"),
                              replier: req.user.id,
                              repliedOn: new Date(Date.now()).toString(),
                              reply,
                        })
                        await post.save()
                        res.status(200).json({
                              replied: true
                        })
                  }
                  else {
                        res.status(404).json({
                              msg: "comment not found"
                        })
                  }
            })
      }
}
exports.deleteReplyComment = async (req, res, next) => {
      try {
            const post = await Post.findById(req.query.postId)
            post.comments.map((c) => {
                  if (c.commentId === req.query.commentId) {
                        c.replies = c.replies.filter((r) => r.replyId !== req.query.replyId)
                  }
            })
            await post.save().then(() => {
                  res.status(200).json({
                        replyDeleted: true
                  })
            })
      } catch (error) {
            res.status(500).json({
                  error
            })
      }
}