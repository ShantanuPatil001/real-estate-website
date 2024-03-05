const dotenv = require('dotenv');
dotenv.config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sessions = require("express-session");
const multer = require("multer");

const port = process.env.PORT || 8080;

const storage = multer.memoryStorage();

const { verifyToken } = require("./middleware/Authentication");

const upload = multer({ storage: storage });

var app = express();

app.get("/", (req, res) => {
  res.redirect("/ideal-venture");
});

var HomeRouter = require("./routes/HomeRoute");
var actionsRouter = require("./routes/actionsRoute");
var publicRouter = require("./routes/publicRoute");
// const { verifyCache } = require("./middleware/Caching");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// creating 2 hours from milliseconds
const session_time = 1000 * 60 * 60;

app.use(verifyToken);
//app.use(verifyCache);
//session middleware's
app.use(
  sessions({
    secret: "thisismysecrctekeyvtcbfg5654nfghdbh46ynifhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {
      maxAge: session_time,
      httpOnly: true,
      sameSite: true,
      secure: true,
      path: "/",
      domain: "localhost",
    },
    resave: true,
  })
);
app.use(upload.array("images", 12));
app.use("/public/v1/", publicRouter);
app.use("/api", HomeRouter);
app.use("/action", actionsRouter);


app.listen(port, () => {
  console.log("server is running on port " + port);
});
