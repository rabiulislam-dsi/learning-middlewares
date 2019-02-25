//require the packages
const createError = require("http-errors");
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

//use middlewares
app.use(function(req, res, next) {
  console.log(`Request => ${req.method} ${req.url} ${res.status.statusCode}`);
  req.on("end", () => {
    console.log(res.status.statusCode);
  });
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
