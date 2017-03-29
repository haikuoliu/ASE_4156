var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, birth : req.body.birth, gender : req.body.gender, email : req.body.email, phone : req.body.phone}), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/profile');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/profile');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/profile', function (req, res) {
    Account.findOne({ 'username' : req.session.passport.user}, 'username birth gender email phone', function (err, account) {
        if (err) return handleError(err);
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        res.status(200).send("cool");
    });
    // res.status(200).send("cool");
})

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/test', function (req, res) {
    console.log(req.session);
    console.log("-------------");
    console.log(req.body);
    console.log("-------------");
    console.log(req.user);
    Account.find(function (err, account) {
        if (err) return console.error(err);
        console.log(account);
        // if (req.session.passport.user == account.username) console.log(account);
    })
    res.status(200).send(req.session.passport.user);
})

module.exports = router;
