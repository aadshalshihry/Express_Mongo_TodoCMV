// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import uniqueValidator from 'mongoose-unique-validator';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

// TODO:
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    passwordHash : {
        type: String,
        required: true
    },
    // confirmed: { type: Boolean, default: false },
    // confirmationToken: { type: String, default: "" }
}, {timestamps: true});

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        username: this.username,
        confirmed: this.confirmed
    }, process.env.JWT_SECRET);
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        username: this.username,
        confirmed: this.confirmed,
        token: this.generateJWT()
    }
};

schema.plugin(uniqueValidator, { message: 'This email is already taken'});

module.exports =  mongoose.model('User', schema);