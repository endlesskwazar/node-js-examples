const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const swaggerUi = require('swagger-ui-express');

const { strategy } = require('./auth/strategy');
const { routes } = require('./routes');
const swaggerDocument = require('./swagger.json');

//add socket io to req
app.set('socketio', io);

app.use(express.static('static'));
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

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(8080, function() {
    console.log('server started');
});