//require the packages
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//require routers
const indexRouter = require("./routes/index");
const studentsRouter = require("./routes/students");
const aboutRouter = require("./routes/about");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// my middleware for logging
app.use(function(req, res, next) {
  console.log(`Request => ${req.method} ${req.url} `);
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use route handlers
app.use("/", indexRouter);
app.use("/students", studentsRouter);
app.use("/about", aboutRouter);

// error handler middleware
app.use(function(err, req, res, next) {
  console.log(err);
  let reqHeaders = req.headers.accept.split(",");
  if (reqHeaders.includes("*/*") || reqHeaders.includes("text/html")) {
    res.setHeader("content-type", "text/html");
    res.status(err.status);
    res.render("error", { error: err });
  } else {
    res.setHeader("content-type", "application/json");
    res.status(err.status);
    res.send({ error: err });
  }
});

module.exports = app;
