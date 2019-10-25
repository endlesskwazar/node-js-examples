const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');

const {routes} = require('./routes');

const app = express();
// configure session
const sess = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {}
};

// configure secure if production
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
};

app.use(session(sess));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(routes);

app.listen(8080);