var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, birth : req.body.birth, gender : req.body.gender, email : req.body.email, phone : req.body.phone}), req.body.password, function(err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Register fail"}}));
            res.end();
            // return res.render('register', { account : account });
        }
        else {
            res.write(JSON.stringify({status: "succ", result: {username: req.body.username}}));
            res.end();
        }
    });
});

router.post('/login', function(req, res) {
    Account.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Fail due to unknow err"}}));
            res.end();  
        }
        if (user === false) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Fail due to incorrect username or password"}}));
            res.end();  
        } else {
            res.write(JSON.stringify({status: "succ", result: {username: req.body.username}}));
            res.end();
        }
    });
});

router.get('/getBasicInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username birth gender email phone', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            res.write(JSON.stringify({status: "succ", result: {username: account.username, 
                birth : account.birth, gender : account.gender, 
                email : account.email, phone : account.phone
            }}));
            res.end();
        }
    });
});

router.get('/getPetsInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username petsInfo', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find pets information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            res.write(JSON.stringify({status: "succ", result: {petsInfo: account.petsInfo}}));
            res.end();
        }
    });
});

router.get('/getCentersInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username centersInfo', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            res.write(JSON.stringify({status: "succ", result: {centersInfo: account.centersInfo}}));
            res.end();
        }
    });
});

router.get('/getPost', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username post', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find post information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            res.write(JSON.stringify({status: "succ", result: {post: account.post}}));
            res.end();
        }
    });
});

router.get('/getOrder', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username order', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find order information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            res.write(JSON.stringify({status: "succ", result: {order: account.order}}));
            res.end();
        }
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// router.get('/profile', function (req, res) {
//     Account.findOne({ 'username' : req.session.passport.user}, 'username birth gender email phone', function (err, account) {
//         if (err) return handleError(err);
//         // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
//         console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
//         res.status(200).send("cool");
//     });
//     // res.status(200).send("cool");
// })

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

// router.get('/test', function (req, res) {
//     console.log(req.session);
//     console.log("-------------");
//     console.log(req.body);
//     console.log("-------------");
//     console.log(req.user);
//     Account.find(function (err, account) {
//         if (err) return console.error(err);
//         console.log(account);
//         // if (req.session.passport.user == account.username) console.log(account);
//     })
//     res.status(200).send(req.session.passport.user);
// })

module.exports = router;
