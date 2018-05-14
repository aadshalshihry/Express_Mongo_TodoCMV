import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';

// Config folder
import passportConfig from './config/passport';

// Import Routers
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import UserRouterAPI from './routes/api/UserRouterAPI';
import ToDoRouterAPI from './routes/api/ToDoRouterAPI';

// to get environments variables
dotenv.config();

// Institutionalize express
const app = express();

// Connect Mongoose and add the Promise using bluebird
mongoose.Promise = Promise;
const db = mongoose.connect(process.env.MONGODB_URL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Config express session
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'tut',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Config passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Config flash
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/users', usersRouter);
indexRouter(app, passport);

// API Router
UserRouterAPI(app);
ToDoRouterAPI(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
