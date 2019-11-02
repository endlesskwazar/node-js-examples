const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const {strategy} = require('./auth/strategy');
const {routes} = require('./routes');

const app = express();


passport.use(strategy);
app.use(passport.initialize());

// parse oly json via body-parser
app.use(bodyParser.json());

app.use(routes);

app.listen(8080);