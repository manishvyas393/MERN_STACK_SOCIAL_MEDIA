const Chat = require("../model/chatModel")
const User = require("../model/user")
exports.acessChat = async (req, res) => {
      const userId = req.params.id
      if (!userId) {
            return res.status(402).json({
                  msg: "no user"
            })
      }
      let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                  { users: { $elemMatch: { $eq: req.user._id } } },
                  { users: { $elemMatch: { $eq: userId } } },
            ],
      }).populate("users", "-password")
            .populate("latestMsg")
      isChat = await User.populate(isChat, {
            path: "latestMsg.sender",
            select: "_id username  profilePicture.url",
      })
      if (isChat.length > 0) {
            return res.status(200).json({
                  chat: isChat[0]
            })
      }
      else {
            let chatData = {
                  chatName: "sender",
                  isGroupChat: false,
                  users: [req.user.id, userId]
            }
            try {
                  const createdChat = await Chat.create(chatData)
                  const fullChat = await Chat.findOne({ _id: createdChat.id }).populate("users", "_id username  profilePicture.url")
                  res.status(200).json({
                        chat: fullChat
                  })
            }
            catch (err) {
                  console.log(err)
                  res.status(500).json({
                        err
                  })
            }
      }

}
exports.fetchChats = async (req, res) => {
      await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "_id username  profilePicture.url")
            .populate("groupAdmin", "_id username  profilePicture.url")
            .populate("latestMsg")
            .sort({ updatedAt: -1 })
            .then(async results => {
                  results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "_id username  profilePicture.url",
                  });
                  res.status(200).json({
                        chats:results
                  });
      })
}
exports.singleChat = async (req, res) => {
      const chat = await Chat.findById(req.params.chatId).populate("users", "_id username  profilePicture.url")
      res.status(200).json({
            chat
      })
}