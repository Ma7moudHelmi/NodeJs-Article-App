const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");

const articlesRouter = require("./routes/articlesRouter");
const usersRouter = require("./routes/usersRouter");
const authenticationRouter = require("./routes/authonticationRouter");

require('dotenv').config()
require("./passportConfig")(passport);

const app = express();
app.use(cors());
app.use(logger("dev"));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use(authenticationRouter);
app.use(usersRouter);
app.use(articlesRouter);

/* Not Found MiddleWare */
app.use((req, res, next) => {
    res.status(404).send("NOT FOUND");
});
/* ERROR MiddleWare */
app.use((error, req, res, next) => {
    let stat = error.status || 500
    res.status(stat).json({message: error + ""});
});

module.exports = app;
