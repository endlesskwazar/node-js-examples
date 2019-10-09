var express = require('express');
var exphbs  = require('express-handlebars');
var {router} = require('./routes/route');
var bodyParser = require('body-parser')
var app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var server = app.listen(8081, function(){
	var host = server.address().address
	var port = server.address().port

console.log("Example app listening at http://%s:%s", host, port)
});