const errorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const User = require("../model/user")
exports.isAuthenticatedUser = async (req, res, next) => {
      const { token } = req.cookies;
      if (!token) {
            return next(new errorHandler("please login to acess this", 401))
      }
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodeToken.id)
      next()
}