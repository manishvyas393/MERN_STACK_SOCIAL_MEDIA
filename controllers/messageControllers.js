const Message = require("../model/messageModel")
const User = require("../model/user")
const Chat = require("../model/chatModel")
exports.getAllMessages = async (req, res) => {
      const chatId = req.params.id
      const messages = await Message.find({chat: chatId }).populate("sender", "_id username  profilePicture.url").populate("chat")
      res.status(200).json({
            messages
      })
}
exports.sendMessage = async (req, res) => {
      const msg = req.body.msg;
      const chatId = req.params.id
      if (!msg || !chatId) {
            console.log("Invalid data passed into request");
            return res.sendStatus(400); 
      }
      let newMessage = {
            sender: req.user.id,
            content: msg,
            chat:chatId
      }
      try {
            let message = await Message.create(newMessage)
            message = await message.populate("sender", "_id username  profilePicture.url")
            message = await message.populate("chat")
            message = await User.populate(message, {
                  path: "sender",
                  select:"_id username  profilePicture.url"
            })
            await Chat.findByIdAndUpdate(chatId, { latestMsg: message._id });
            res.status(200).json({
                  message,
                  sent:true
            })
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  error
            })
      }
}