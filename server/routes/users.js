var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
            console.log(account)
            if (account === null) {
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
                res.end();
            }
            res.write(JSON.stringify({status: "succ", result: {username: account.username,
                birth : account.birth, gender : account.gender,
                email : account.email, phone : account.phone
            }}));
            res.end();
        }
    });
});

module.exports = router;
