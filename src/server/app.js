import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Import Routers
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import UserRouterAPI from './routes/api/UserRouterAPI';

// to get environments variables
dotenv.config();

// Institutionalize express
const app = express();

// Connect Mongoose and add the Promise using bluebird
mongoose.Promise = Promise;
const db = mongoose.connect(process.env.MONGODB_URL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Config express session
app.use(session({
    secret: 'tut',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: db.connection
    })
}));

app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/users', usersRouter);
indexRouter(app);

// API Router
UserRouterAPI(app);

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
