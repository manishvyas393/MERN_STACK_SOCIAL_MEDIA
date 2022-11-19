const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const jwt=require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
      {
            username: {
                  type: String,
                  require: true,
                  min: 3,
                  max: 20,
                  unique: true,
            },
            followRequests: [
                  {
                        user: {
                              type: ObjectId,
                              require: true,
                              ref: "User",
                        }
                  },
            ],
            RequestedToFollow: [
                  {
                        user: {
                              type: ObjectId,
                              require: true,
                              ref: "User",
                              default:null
                        }
                  }
            ],
            full_name: {
                  type: String,
                  default:null
            },
            email: {
                  type: String,
                  required: true,
                  max: 50,
                  unique: true,
            },
            password: {
                  type: String,
                  required: true,
                  min: 6,
            },
            profilePicture: {
                  public_id: {
                        type: String,
                        default:null
                  },
                  url: { type: String, default: null}
                  
            },
            phone_no: {
                  type: String,
                  default:"0"
            },
            profileStatus: {
                  type: String,
                  default:"public"
            },
            followers: [
                  {
                        user: {
                              type: ObjectId,
                              require: true,
                              ref: "User"
                        }
                  }
            ],
            followings: [
                  {
                        user: {
                              type:ObjectId,
                              require: true,
                              ref: "User"
                        }
                  }
            ],
            bio: {
                  type: String,
                  default:""
            },
            website: {
                  type: String,
                  default:""
            },
            dob: {
                  type:Date,
                  default:Date.now(),
            },
            gender: {
                  type: String,
                  default:""
            },
            passwordResetToken: {
                  type: String,
                  default:null
            }
      },
      { timestamps: true }
);

UserSchema.methods.getJWTToken = function () {
      return jwt.sign({ id: this._id },"gyhunhyvgtvbybnhbvgbjnhbgvtvbhjb", {
            expiresIn: process.env.JWT_EXPIRE,

      })
}

module.exports = mongoose.model("User", UserSchema);