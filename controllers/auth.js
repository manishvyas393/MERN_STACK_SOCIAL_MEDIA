const User = require("../model/user")
const bcrypt = require("bcrypt")
const sendToken = require("../utils/sendtoken")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
exports.loginControl = async (req, res, next) => {
      try {
            const user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.email }] })
            if (user) {

                  const validatePass = await bcrypt.compare(req.body.password, user.password)
                  console.log(validatePass)
                  if (validatePass) {
                        sendToken(user, 200, res)
                  }
                  else {
                        res.status(200).json({
                              success: false,
                              msg: "password didn't match"
                        })
                  }
            }
            else {
                  res.status(404).json({
                        success: false
                  })
            }


      } catch (error) {
            res.status(500).json({
                  error: error
            })
      }
}

exports.createAccountControl = async (req, res, next) => {
      try {
            const alreadyUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
            if (alreadyUser) {
                  res.status(200).json({
                        success: false,
                        msg: "user is already there with this email or username"
                  })
            }
            else {
                  const salt = await bcrypt.genSalt(10)
                  const hashedPassword = await bcrypt.hash(req.body.password, salt)

                  const user = await new User({
                        username: req.body.username,
                        email: req.body.email,
                        phone_no: req.body.phoneNo,
                        password: hashedPassword,
                        dob: req.body.dob
                  })
                  const saveUser = await user.save()
                  console.log(saveUser)
                  res.status(200).json({
                        success: true
                  })
            }
      } catch (error) {
            res.status(500).json({
                  error: error
            })
      }
}

exports.logoutController = async (req, res, next) => {
      res.status(200).clearCookie("token").json({
            success: true,
            message: "loggged out"
      })
}
exports.resetLink = async (req, res, next) => {
      const { email } = req.body
      await User.findOne({ email: email }).then(async (user) => {
            if (user) {
                  const token = jwt.sign({
                        id: user.id,
                        exp: Date.now() + 5 * 60 * 1000,
                        iat: Date.now()
                  }, process.env.JWT_SECRET)
                  user.passwordResetToken = token
                  await user.save()
                  const transport = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                              user: process.env.email,
                              pass: process.env.pass
                        }
                  })
                  const options = {
                        from: process.env.email,
                        to: email,
                        subject: "Reset Password Link",
                        html: `<a href="${process.env.SITE_URL || ""}forgotPassword/${token}">reset password</a>`
                  }
                  transport.sendMail(options, (err) => {
                        if (err) {
                              res.status(500).json({
                                    err
                              })
                        }
                  })
                  res.status(200).json({
                        sent: true,
                        msg: "Mail Sent Check Your Inbox"
                  })

            }
            else {
                  res.status(200).json({
                        sent: false,
                        msg: "User Not Found"
                  })
            }
      })
}
exports.updatePassword = async (req, res, next) => {
      const decodeToken = jwt.decode(req.params.token)
      await User.findOne({ id: decodeToken.id }).then(async user => {
            if (user && user.passwordResetToken) {
                  let decodeUserToken = jwt.decode(user.passwordResetToken)
                  let curTime = new Date(Date.now()).toLocaleTimeString()
                  let expTime = new Date(decodeUserToken.exp).toLocaleTimeString()
                  if (expTime > curTime) {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(req.body.password, salt)
                        user.password = hashedPassword;
                        user.passwordResetToken = null;
                        user.save()
                        res.status(200).json({
                              reset: true,
                              msg: "password changed"
                        })
                  }
                  else {
                        user.passwordResetToken = null;
                        user.save()
                        res.status(200).json({
                              reset: false,
                              msg: "Link Expired"
                        })
                  }

            }
            else {
                  res.status(200).json({
                        reset: false,
                        msg: "Token Expired"
                  })
            }
      })
}