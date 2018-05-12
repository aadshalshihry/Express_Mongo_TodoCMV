const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// API SingUp
router.post('/remote_signup', (req, res) => {
    // const { username, password } = req.body.user;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({ username: username, email: email });
    user.setPassword(password);
    user.setConfirmationToken();
    user.save()
        .then(userRecord => {
            // sendConfirmationEmail(userRecord);
            res.json({ user: userRecord.toAuthJSON() });
        })
        .catch(err => res.status(400).json({ errors: "Error: "+err }));
});

// API login
router.post('/remote_login', (req, res) => {
    const credentials = req.body;

    User.findOne({username: credentials.username}).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: "Invalid credentials "}});
        }
    })
});

module.exports = router;