const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const articlesRouter = require('./routes/articlesRouter');
const usersRouter = require('./routes/usersRouter');
const authonticationRouter = require('./routes/authonticationRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authonticationRouter);
app.use(usersRouter);
app.use(articlesRouter);



/* Not Found MiddleWare */
app.use((req,res,next)=>{
    res.status(404).send("NOT FOUND")
});
/* ERROR MiddleWare */
app.use((error,req,res,next)=>{
    res.status(500).send(error+"")
})

module.exports = app;
