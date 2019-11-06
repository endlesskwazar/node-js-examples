const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const swaggerUi = require('swagger-ui-express');

const { strategy } = require('./auth/strategy');
const { routes } = require('./routes');
const swaggerDocument = require('./swagger.json');

const app = express();


passport.use(strategy);
app.use(passport.initialize());

// parse oly json via body-parser
app.use(bodyParser.json());

var options = {
    swaggerOptions: {
        validatorUrl: null
    }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use(routes);

app.listen(8080);