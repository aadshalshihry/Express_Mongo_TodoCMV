// import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import User from '../models/User';


const passportConfig = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    localSignin(passport);
};

const localSignin = (passport) => {
    passport.use('local-signin', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        process.nextTick(() => {
            User.findOne({'username': username}, (err, user) => {
                if(err) return done(err);
                if(!user) return done(null, false, req.flash('loginMessage', 'Username is not exists!!'));
                if(!user.isValidPassword(password))
                    return done(null, false, req.flash('loginMessage', 'password is not correct'));
                return done(null, user);
            });
        });
    }));
};

const localSignup = (passport) => {
    passprot.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, passport, done) => {
        process.nextTick(() => {
            User.findOne({username}, (err, user) => {
                if(err) return done(err);
                else if(user) return done(null, false, req.flash('signupMessage', 'User exist'));
                else {
                    const newUser = new User(req.body);
                    newUser.save((err) => {
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};

export default passportConfig;