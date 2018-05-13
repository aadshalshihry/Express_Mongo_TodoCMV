// var express = require('express');
// var router = express.Router();
// import express from 'express';

import {index} from '../controllers/indexController';

const indexRouter = (app) => {
    const prefix = '/';
    app.get(`${prefix}/`, index)
};

export default indexRouter;
