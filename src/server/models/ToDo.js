import mongoose from 'mongoose';

// import jwt from 'jsonwebtoken';
// import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hasFinished: { type: Boolean, default: false }
}, {timestamps: true});

// schema.plugin(uniqueValidator, { message: 'This email is already taken'});

module.exports = mongoose.model('ToDo', schema);