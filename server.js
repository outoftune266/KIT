const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const flash = require("connect-flash");
const PORT = process.env.PORT || 3001;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}





mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/MessageApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});



app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(cookieParser("secretcode"));
const passport = require("./config/passport.js")
app.use(passport.initialize());
app.use(passport.session());
app.use( (req, res, next) => {
 // console.log('req.session', req.session);
 console.log("passport: ", req.session.passport)
  return next();
})
app.use(routes);





//Socket.io functionality
// http.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

// io.on("connection", (socket) => {
//   console.log("New user connected");
//   socket.emit("connection", null);
// });


app.listen(PORT, function () {
  console.log(`Server is now listening on PORT ${PORT}!`);
});