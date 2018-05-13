import express from 'express';
import jwt from 'jsonwebtoken';
import ToDo from '../../models/ToDo';


const router = (app) => {
    const prefix = "/api/auth";

    // API SingUp
    app.post(`${prefix}/add_new_todo`, (req, res) => {
        const { name, userId } = req.body.todo;

        const todo = new ToDo({ name, userId });

        todo.save()
            .then(todoRecord => {
                res.json({ user: todoRecord });
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