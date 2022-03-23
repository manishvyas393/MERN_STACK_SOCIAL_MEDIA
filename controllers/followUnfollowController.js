const User = require("../model/user")

exports.followUnfollow = async (req, res, next) => {
      try {
            if (req.user.id !== req.params.id) {
                  let alreadyRequested, alreadyFollower;
                  const user = await User.findById(req.params.id)
                  const loggedUser = await User.findById(req.user.id)
                  if (user.profileStatus === "private") {
                        user.followRequests.filter((f) => {
                              if (f) {
                                    if (f.user.toString() === req.user.id) {
                                          alreadyRequested = f.user.toString()
                                          console.log(alreadyRequested)
                                    }
                              }
                              else {
                                    console.log("no")
                              }

                        })

                        user.followers.filter((f) => {
                              if (f.user.toString() === req.user.id) {
                                    alreadyFollower = f.user.toString()
                                    console.log(alreadyFollower)
                              }
                        })
                        if (!alreadyRequested && !alreadyFollower) {
                              await User.findByIdAndUpdate(req.params.id, { $push: { followRequests: { user: req.user.id } } })
                              await User.findByIdAndUpdate(req.user.id, { $push: { RequestedToFollow: { user: req.params.id } } })
                              res.status(200).json({
                                    success: true,
                                    msg: "requested"
                              })
                        } else if (!alreadyRequested && alreadyFollower) {
                              await User.findByIdAndUpdate(req.params.id, { $pull: { followers: { user: req.user.id } } })
                              await User.findByIdAndUpdate(req.user.id, { $pull: { followings: { user: req.params.id } } }).then(() => {
                                    res.status(200).json({
                                          success: true,
                                          msg: "unfollowed"
                                    })
                              })
                        }
                        else if (alreadyRequested && !alreadyFollower) {
                              await User.findByIdAndUpdate(req.params.id, { $pull: { followRequests: { user: req.user.id } } })
                              await User.findByIdAndUpdate(req.user.id, { $pull: { RequestedToFollow: { user: req.params.id } } }).then(() => {
                                    res.status(200).json({
                                          success: true,
                                          msg: "unrequested"
                                    })
                              })
                        }
                        else {
                              await User.findByIdAndUpdate(req.params.id, { $pull: { followRequests: { user: req.user.id } } })
                              await User.findByIdAndUpdate(req.user.id, { $pull: { RequestedToFollow: { user: req.params.id } } }).then(() => {
                                    res.status(200).json({
                                          success: true,
                                          msg: "requested"
                                    })
                              })
                        }
                  }
                  else {
                        try {
                              const user = await User.findById(req.params.id)
                              const loggedUser = await User.findById(req.user.id)
                              if (user.followers.filter(follower =>
                                    follower.user.toString() === loggedUser.id).length > 0) {

                                    await User.findByIdAndUpdate(req.params.id, { $pull: { followers: { user: req.user.id } } })
                                    await User.findByIdAndUpdate(req.user.id, { $pull: { followings: { user: req.params.id } } }).then(() => {
                                          res.status(200).json({
                                                success: true,
                                                msg: "unfollowed"
                                          })
                                    })

                              }
                              else {
                                    await user.updateOne({ $push: { followers: { user: req.user.id } } })
                                    await loggedUser.updateOne({ $push: { followings: { user: req.params.id } } }).then(() => {
                                          res.status(200).json({
                                                success: true,
                                                msg: "followed"
                                          })
                                    })
                              }
                        } catch (error) {

                              res.status(500).json({
                                    err: error
                              })
                        }
                  }

            }
            else {
                  res.status(403).json({
                        success: false
                  })
            }

      } catch (error) {
            console.log(error)
            res.status(500).json({
                  err: error
            })
      }
}
exports.removeFollower = async (req, res, next) => {
      try {
            await User.findByIdAndUpdate(req.user.id, { $pull: { followers: { user: req.params.id } } })
            await User.findByIdAndUpdate(req.params.id, { $pull: { followings: { user: req.user.id } } })
            res.status(200).json({
                  removed: true
            })
      } catch (error) {
            res.status(500).json({
                  error
            })
      }
}
exports.acceptRequest = async (req, res, next) => {
      try {
            const loggedUser = await User.findById(req.user.id)
            const user = await User.findById(req.params.id)
            loggedUser.followRequests.map(async (f) => {
                  if (f.user.toString() === req.params.id) {
                        await User.findByIdAndUpdate(req.user.id, {
                              $pull: { followRequests: { user: req.params.id } }, $push: { followers: { user: req.params.id } }
                        })
                        await User.findByIdAndUpdate(req.params.id, { $pull: { RequestedToFollow: { user: req.user.id } }, $push: { followings: { user: req.user.id } } }).then(() => {
                              res.status(200).json({
                                    success: true,
                                    msg: "accepted"
                              })
                        })
                  }
            })
      } catch (error) {
            res.status(500).json({
                  error
            })
      }
}
exports.cancelRequest = async (req, res, next) => {
      try {
            const loggedUser = await User.findById(req.user.id)
            const user = await User.findById(req.params.id)
            loggedUser.followRequests.map(async (f) => {
                  if (f.user.toString() === req.params.id) {
                        await User.findByIdAndUpdate(req.user.id, {
                              $pull: { followRequests: { user: req.params.id } }
                        })
                        await User.findByIdAndUpdate(req.params.id, { $pull: { RequestedToFollow: { user: req.user.id } } }).then(() => {
                              res.status(200).json({
                                    removed: true,
                                    msg: "canceled"
                              })
                        })
                  }
            })
      } catch (error) {
            res.status(500).json({
                  error
            })
      }
}