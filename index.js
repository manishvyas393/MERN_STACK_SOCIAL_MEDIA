const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const auth = require("./routes/auth")
const post = require("./routes/posts")
const users = require("./routes/users")
const chat = require("./routes/chat")
const message = require("./routes/message")
const cloudinary = require("cloudinary").v2
const fileUpload = require("express-fileupload")
const path = require("path")
const { Server, Socket } = require("socket.io")
app.use(cors({
      origin: true,
      credentials: true
}))
dotenv.config()
mongoose.connect(process.env.db_url).then(() => console.log("connected"))
cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret
});
app.use(fileUpload({
      useTempFiles: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", auth)
app.use("/api/post", post)
app.use("/api/user", users)
app.use("/api/chat", chat)
app.use("/api/message", message)
if (process.env.NODE_ENV === "production") {
      //Set static folder
      app.use(express.static("insta/build"));
      app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "insta", "build", "index.html"));
      });
}
const server = app.listen(process.env.PORT || 3001, () => console.log("running"))
const io = new Server(server, ({
      pingTimeout: 600000,
      cors: {
            origin: "http://localhost:3000"
      }
}));
io.on("connect", (socket) => {
      socket.on("getuser", (user) => {
            socket.join(user);
      });
      socket.on("chatroom", (chatId) => {
            socket.join(chatId);
      });
      socket.on("typing", (chatId) => socket.in(chatId).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
      socket.on("newmessage", (newmsg) => {
            newmsg?.chat?.users?.forEach(u => {
                  if (u !== newmsg.sender._id) {
                        console.log(u !== newmsg.sender._id);
                        socket.in(u).emit("newMsg", newmsg);
                  }
            });
      });
})