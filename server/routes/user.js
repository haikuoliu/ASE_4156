var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/*
--------input--------:
http://localhost:3000/register
username = "zehao"
password = "123"
birth = 5490549059 (an UNIX timestamp)
gender = "male"
email = "zehao@gmail.com"
phone = "9179575118"

 --------output--------:
{
    "status":"succ",
    "result":{
        "username":"zehao"
    }
}
*/
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, birth : req.body.birth, gender : req.body.gender, email : req.body.email, phone : req.body.phone, petsInfo: [], centersInfo: [], order: []}), req.body.password, function(err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Register fail"}}));
            res.end();
        }
        else {
            res.write(JSON.stringify({status: "succ", result: {username: req.body.username}}));
            res.end();
        }
    });
});

/*
 --------input--------:
 http://localhost:3000/login
 username = "zehao"
 password = "123"

--------output--------:
{
   "status":"succ",
   "result":{
       "username":"zehao"
   }
}
 */
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

/*
--------input--------:
http://localhost:3000/basicInfo?username=zehao

--------output--------:
{
    "status":"succ",
    "result":{
        "username":"zehao",
        "birth":5490549059,
        "gender":"male",
        "email":"zehao@gmail.com",
        "phone":"9179575118"
    }
}
 */
router.get('/basicInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username birth gender email phone', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            console.log("account: " +account);

            if (account == null) {
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

/*
--------input--------:
http://localhost:3000/basicInfo
username = "zehao"
gender = "male"
birth = 19343949959
email = "zehao1@gmail.com"
phone = "111111111"

--------output--------:
{
    "status":"succ",
    "result":{
        "username":"zehao"
    }
}
 */

router.put('/basicInfo', function(req, res) {
    Account.findOne({ 'username' : req.body.username}, 'username birth gender email phone', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
            res.end();
        }
        else {
            if (account == null) {
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
                res.end();
                return;
            }
            if (req.body.birth != null)
                account.birth = req.body.birth;
            if (req.body.gender != null)
                account.gender = req.body.gender;
            if (req.body.email != null)
                account.email = req.body.email;
            if (req.body.phone != null)
                account.phone = req.body.phone;
            account.save(function (err) {
                if (err) {
                    res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                    res.end();
                } else {
                    res.write(JSON.stringify({status: "succ", result: {username: req.body.username}}));
                    res.end();
                }
            })
        }
    });
});

module.exports = router;
