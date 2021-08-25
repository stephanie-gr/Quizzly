// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
// const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const quizzesRoutes = require("./routes/quizzes");
const homepageRoutes = require("./routes/homepage");
const loginRoutes = require("./routes/login");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
//TODO: route the rest of quizzes.js
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/quizzes", quizzesRoutes.getQuizzes(db));
app.use(
  "/api/quizzes/questions/:quiz_id",
  quizzesRoutes.newQuestionFormShow(db)
);
app.use("/api/quizzes/new", quizzesRoutes.newQuizFormShow(db));
app.use("/api/quizzes/:quiz_id", quizzesRoutes.getQuiz(db));
app.use("/api/", homepageRoutes(db));

app.use("/login", loginRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login/:id", (req, res) => {
  res.cookie("user_id", req.params.id).redirect("/");
});

app.get("/quizzes", (req, res) => {
  res.render("my_quizzes");
});

app.get("/quizzes/new", (req, res) => {
  res.render("create_quiz");
});

app.get("/quizzes/:quiz_id", (req, res) => {
  // console.log("here:", req.body);
  const templateVars = { quizID: req.params.quiz_id };
  res.render("take_quiz", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
