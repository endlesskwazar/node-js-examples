const {jwtOptions} = require('./jwt-options');
const passportJWT = require('passport-jwt');
const {User} = require('../models');

let JwtStrategy = passportJWT.Strategy;

const strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    const user = await User.findByPk(jwt_payload.id);
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

exports.strategy = strategy;