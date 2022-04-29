const User = require("../model/user")
const Post = require("../model/posts")
const cloudinary = require("cloudinary").v2
exports.searchUser = async (req, res, next) => {
      console.log(req.user.id)
      const keyword = req.query.search
            ? {
                  $or: [
                        { username: { $regex: req.query.search, $options: "i" } },
                        { email: { $regex: req.query.search, $options: "i" } },
                  ],
            }
            : {};
      const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });
      res.status(200).json({
            users
      })
}
exports.loggedUserPosts = async (req, res, next) => {
      const posts = await Post.find({ userId: req.user.id }).populate("userId", "_id username  profilePicture.url")
      if (posts) {
            res.status(200).json({
                  posts
            })
      }
      else {
            res.status(404).json({
                  success: false,
                  error: "no posts"
            })
      }
}
exports.loggedUserProfile = async (req, res, next) => {
      try {
            const user = await User.findById(req.user.id).populate("followings.user", "username profilePicture.url")
                  .populate("followers.user", "username profilePicture.url")
                  .populate("followRequests.user", "id username  profilePicture.url")
                  .populate("RequestedToFollow.user", "id username  profilePicture.url")
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json({
                  user: other,
                  success:true
            })
      } catch (error) {
            res.status(500).json({
                  err: error
            })
      }
}
exports.getOtherUserProfile = async (req, res, next) => {
      try {
            let requestedUserProfile = {};
            let alreadyFollowed, requesedToFollow;
            const user = await User.findOne({ username: req.params.username })
                  .populate("followRequests.user", "_id username  profilePicture.url")
                  .populate("RequestedToFollow.user", "_id username  profilePicture.url")
                  .populate("followers.user", "_id username  profilePicture.url")
                  .populate("followings.user", "_id username  profilePicture.url")
            const post = await Post.find({ userId: user.id }).populate("userId", "_id username  profilePicture.url")
            if (user.profileStatus == "private") {
                  user.followers.map(f => {
                        if (f.user.id === req.user.id)
                              alreadyFollowed = f.user.id
                  })
                  user.followRequests.map(r => {
                        if (r.user.id === req.user.id) {
                              requesedToFollow = r.user.id
                        }
                  })
                  if (!requesedToFollow && !alreadyFollowed) {
                        const { bio, website, username, _id, profilePicture, followers, followings } = user._doc
                        requestedUserProfile = {
                              userBio: bio,
                              userWebsite: website,
                              userUserName: username,
                              userId: _id,
                              dp: profilePicture,
                              profileStatus: user.profileStatus,
                              totalPosts: post.length,
                              totalFollowers: followers.length,
                              totalFollowings: followings.length,
                              notRequested: true,
                              notFollowed: true

                        }
                        res.status(200).json({
                              user: requestedUserProfile
                        })

                  }
                  if (alreadyFollowed) {
                        const { password, updatedAt, ...other } = user._doc;
                        res.status(200).json({
                              user: other, post, youFollowed: true
                        })
                  }
                  if (requesedToFollow) {
                        console.log("requested")
                        console.log(post.length)
                        const { bio, website, username, _id, profilePicture, followers, followings } = user._doc
                        requestedUserProfile = {
                              userBio: bio,
                              userWebsite: website,
                              userUserName: username,
                              userId: _id,
                              dp: profilePicture,
                              profileStatus: user.profileStatus,
                              totalPosts: post.length,
                              totalFollowers: followers.length,
                              totalFollowings: followings.length,
                              requested: true
                        }
                        res.status(200).json({
                              user: requestedUserProfile
                        })
                  }
            }
            else {
                  user.followers.map(f => {
                        if (f.user.id === req.user.id)
                              alreadyFollowed = f.user.id
                  })
                  const { password, updatedAt, ...other } = user._doc;
                  if (alreadyFollowed) {
                        res.status(200).json({
                              user: other, post, youFollowed: true
                        })
                  }
                  else {
                        res.status(200).json({
                              user: other, post
                        })
                  }

            }
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  err: error
            })
      }
}

exports.updateBasicProfileDetails = async (req, res, next) => {
      try {
            if (req.user.id === req.params.id) {
                  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                  });
                  res.status(200).json({
                        success: true,
                        user: user
                  })
            }
            else {
                  return res.status(403).json({
                        success: false
                  });
            }
      } catch (error) {
            console.log(error)
            return res.status(500).json({
                  error: error
            });
      }

}
exports.updatePersonelDetails = async (req, res, next) => {
      try {
            if (req.user.id === req.params.id) {
                  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                  });
                  res.status(200).json({
                        success: true,
                        user: user
                  })
            }
            else {
                  return res.status(403).json({
                        success: false
                  });
            }
      } catch (error) {
            return res.status(500).json({
                  error: error
            });
      }
}
exports.uploadProfilePic = async (req, res, next) => {
      try {
            let file = req.files.avatar
            const user = await User.findById(req.user.id);
            if (user.profilePicture.public_id !== null) {
                  await cloudinary.uploader.destroy(user.profilePicture.public_id);
            }
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                  folder: "fbProfilePic",
                  width: 150,
                  crop: "scale",
            }, function (err, result) {
                  console.log(err)
                  console.log(result)
            });
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
                  profilePicture: {
                        public_id: myCloud.public_id,
                        url: myCloud.url
                  }
            })
            res.status(200).json({
                  success: true,
                  user: updatedUser
            })

      } catch (error) {
            res.status(500).json({
                  err: error
            })
      }
}

exports.setProfileStatus = async (req, res, next) => {

      if (req.body.status === "public") {
            console.log(req.body.status)
            const user = await User.findById(req.user.id)
            if (user.followRequests.length !== 0) {
                  user.followRequests.map(async (r) => {
                        if (r) {
                              user.followers.push({ user: r.user })
                              await User.findByIdAndUpdate(r.user, { $pull: { RequestedToFollow: { user: req.user.id } }, $push: { followings: { user: req.user.id } } })
                        }
                  })
            }
            user.followRequests = []
            user.profileStatus = "public"
            await user.save()
            res.status(200).json({
                  success: true,
                  msg: "account public"
            })
      }
      else {
            await User.findByIdAndUpdate(req.user.id, { profileStatus: req.body.status }).then((data) => {
                  res.status(200).json({
                        success: true,
                        msg: "account privated"
                  })
            })
      }

}
exports.deleteUser = async (req, res, next) => {
      try {
            if (req.user.id === req.params.id) {
                  const user = await User.findByIdAndDelete(req.params.id)
                  res.status(200).json({
                        success: true
                  })
            }
            else {
                  res.status(403).json({
                        success: false
                  })
            }
      } catch (error) {
            res.status(500).json({
                  err: error
            })
      }
}
