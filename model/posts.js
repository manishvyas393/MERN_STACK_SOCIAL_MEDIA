const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const PostSchema = new mongoose.Schema(
      {
            userId: {
                  type: ObjectId,
                  ref: "User",
                  required: true,
            },
            desc: {
                  type: String,
                  max: 500,
            },
            img: {
                  public_id: {
                        type: String,
                        default: null
                  },
                  url: { type: String, default: null }
            },
            likes: [
                  {
                        userId: {
                              type: ObjectId,
                              require: true,
                              ref: "User"
                        }
                  }
            ],
            comments: [{
                  commentId: {
                        type: String
                  },
                  user: {
                        type: ObjectId,
                        ref: "User",
                  },
                  comment: {
                        type: String,
                  },
                  commentedOn: {
                        type: String,
                  },
                  replies: [{
                        replyId: {
                              type:String
                        },
                        reply: {
                             type:String 
                        },
                        replier: {
                              type: ObjectId,
                              ref:"User"
                        },
                        repliedOn: {
                              type:String
                        }
                  }
                  ]
            }],
            Date: {
                  type: String,
                  default: Date.now()
            }
      },
      { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);