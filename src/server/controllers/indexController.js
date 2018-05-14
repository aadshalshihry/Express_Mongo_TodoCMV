import User from '../models/User';
import ToDo from '../models/ToDo';

export const index = (req, res) => {
    ToDo.find({}).exec((err, todos)=> {
        console.log(todos);
        res.render('index', {
            title: "New Express",
            todos: todos,
            user: req.user
        });
    });
};

export const renderLoginPage = (req, res) => {
    if(req.session.passport.user){
        res.render('index', {
            title: "New Express",
        });
    } else {
        res.render('login', {
            title: "Login",
            message: req.flash('loginMessage')
        });
    }
};

export const signout = (req, res) => {
    req.logout();
    res.redirect("/");
};