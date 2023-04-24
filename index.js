// for admin user sign in  with email- james@gmail.com  and password james  for testing admin side
// for using user or employee side please use your own credetials
// u can test this app by using the mongodb compass

let express = require("express"); // nnn
let app = express();
let port = process.env.PORT || 8080;

const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");

const passport = require("passport");
const LocalStrategy = require("./config/passport");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

const sassMiddleware = require("node-sass-middleware");

const dotenv = require("dotenv").config();
console.log(dotenv);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css",
  })
);
console.log(process.env.secret);

app.use(
  session({
    name: "employeeReviewSystem",
    secret: "process.env.secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    store: MongoStore.create(
      {
        mongoUrl: process.env.dburl,
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "connect mongodb setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in starting the server");
    return;
  }
  console.log(`server has started on port ${port}`);
});
