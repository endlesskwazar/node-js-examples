var express = require('express');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const protect = (req, res, next) => {
    if (!req.cookies['user']) {
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
                res.cookie('user', user.login);
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
    res.clearCookie('user');
    res.redirect('/login');
});

app.listen(3000);