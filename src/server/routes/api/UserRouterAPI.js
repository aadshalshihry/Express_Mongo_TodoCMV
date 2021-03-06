import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';


const router = (app) => {
    const prefix = "/api/auth";

    // API SingUp
    app.post(`${prefix}/remote_signup`, (req, res) => {
        const { username, email, password } = req.body.user;

        const user = new User({ username, email });
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
    app.post(`${prefix}/remote_login`, (req, res) => {
        const credentials = req.body;

        User.findOne({username: credentials.username}).then(user => {
            if (user && user.isValidPassword(credentials.password)) {
                res.json({ user: user.toAuthJSON() });
            } else {
                res.status(400).json({ errors: { global: "Invalid credentials "}});
            }
        })
    });
};

/* :Todo
    1. confirmation
    2. reset password
    3. validate_token
    4. set_new_password
 */


export default router;