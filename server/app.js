var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var app = express();


app.use(cors());
app.use(busboyBodyParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://MastersParty:MastersParty@cluster0-shard-00-00-qx1je.mongodb.net:27017,cluster0-shard-00-01-qx1je.mongodb.net:27017,cluster0-shard-00-02-qx1je.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');


var user = require('./routes/user');
var pet = require('./routes/pet');
var center = require('./routes/center');
var order = require('./routes/order');
var search = require('./routes/search');
var social = require('./routes/social_login');


app.use('/', user);
app.use('/', pet);
app.use('/', center);
app.use('/', order);
app.use('/', search);
app.use('/', social);

app.use('/app', function(req,res) {
    res.sendfile(path.join(__dirname)+'/views/welcome.html');
});

app.use('/', function(req,res) {
    res.sendfile(path.join(__dirname)+'/frontend/index.html');
});

// catch 404 error
app.use(function (req, res, next) {
    res.write(JSON.stringify({status: "fail", result: {msg: "Request URI doesn't exist"}}));
    res.end();
});


module.exports = app;
