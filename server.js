var express = require('express');
var path = require('path');
var mainRouter = require('./router/main');
var apiRouter = require('./router/api');
var bodyParser = require('body-parser');

var app  = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.set('views', __dirname + '/view');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000,function(){
  console.log('3000');
});