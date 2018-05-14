// var express = require('express');
// var router = express.Router();
// import express from 'express';

import {index, renderLoginPage, signout} from '../controllers/indexController';


const indexRouter = (app, passport) => {
    const prefix = '';
    app.get(`${prefix}/`, index)
    app.route(`${prefix}/login`)
        .get(renderLoginPage)
        .post(passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.get(`${prefix}/singout`, signout);
};

export default indexRouter;
