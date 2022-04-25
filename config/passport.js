const User = require('../models/user');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

require('dotenv').config();

module.exports = passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}, (jwtPayload, done) => {
    User.findOne({ _id: jwtPayload.id })
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(error => {
            console.log(error);
            return done(error, false);
        });
}))
