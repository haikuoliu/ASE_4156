var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/getCentersInfo', function(req, res) {
	console.log("centers!!");
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


module.exports = router;