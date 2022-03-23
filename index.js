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
const cloudinary = require("cloudinary").v2
const fileUpload = require("express-fileupload")
const path=require("path")
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
if (process.env.NODE_ENV === "production") {
      //Set static folder
      app.use(express.static("insta/build"));
      app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "insta", "build", "index.html"));
      });
}
app.listen(process.env.PORT || 3001, () => console.log("running"))