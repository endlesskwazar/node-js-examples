const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const helpers = require('handlebars-helpers')();
var FileStore = require('session-file-store')(session);

const {routes} = require('./routes');

const app = express();
// configure session
const sess = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    name: 'my-session',
    store: new FileStore,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
};

app.use(session(sess));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: '.handlebars', helpers: {helpers}}));
app.set('view engine', 'handlebars');
app.use(routes);

app.listen(process.env.PORT || 8080);
exports.app = app; // Експортуємо для тестування