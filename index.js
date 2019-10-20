var express = require('express');
var session = require('express-session');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var sess = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {}
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
};
app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const protect = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/', protect, (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    if (req.body.login && req.body.password) {
        const users = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        users.forEach(user => {
            if (user.login == req.body.login && user.password == req.body.password) {
                req.session.user = user.login;
                res.redirect('/');
            }
            else {
                res.render('login', {message: 'Credentioals wrong'});
            }
        });
    }
    else {
        res.render('login', {message: 'Credentioals not provided'});
    }
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
});

app.listen(3000);