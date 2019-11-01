const express = require('express');
const bodyParser = require('body-parser');

const {routes} = require('./routes');

const app = express();

// parse oly json via body-parser
app.use(bodyParser.json());

app.use(routes);

app.listen(8080);