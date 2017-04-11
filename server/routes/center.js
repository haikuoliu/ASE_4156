var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;


// router.get('/getCentersInfo', function(req, res) {
// 	console.log("centers!!");
//     Account.findOne({ 'username' : req.query.username}, 'username centersInfo', function (err, account) {
//         if (err) {
//             res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
//             res.end();
//         }
//         // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
//         // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
//         else {
//             res.write(JSON.stringify({status: "succ", result: {centersInfo: account.centersInfo}}));
//             res.end();
//         }
//     });
// });

router.get('/getCentersInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username, 'centersInfo.cid' : req.body.cid}, 'username centersInfo', function (err, account) {
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


router.post('/editCentersInfo', function (req, res) {
    // create centersInfo
    if (req.body.cid === "-1") {
        Account.findOne({ 'username' : req.body.username}, 'username centersInfo', function(err, account) {
            if (err) {
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user"}}));
                res.end();
            } else {
                var objectId = new ObjectID();
                account.centersInfo.push({cid: objectId, title: req.body.title, content: req.body.content, location: req.body.location, size: req.body.size, timestamp: req.body.timestamp});
                account.save(function (err) {
                    if (err) {
                        res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                        res.end();
                    } else {
                        res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: objectId}}));
                        res.end();
                    }
                })
            }
        });
    }

    // edit centersInfo
    else {
        Account.findOne({ 'username' : req.body.username, 'centersInfo.cid' : req.body.cid}, 'username centersInfo', function(err, account) {
            if (err) {
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't find center"}}));
                res.end();
            } else {
                account.centersInfo.title = req.body.title;
                account.centersInfo.content = req.body.content;
                account.centersInfo.location = req.body.location;
                account.centersInfo.size = req.body.size;
                account.centersInfo.timestamp = req.body.timestamp;
                account.save(function (err) {
                    if (err) {
                        res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                        res.end();
                    } else {
                        res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: req.body.cid}}));
                        res.end();
                    }
                })
            }
        });
    }
});

router.get('/deleteCentersInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username centersInfo', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            for (var i = 0; i < account.centersInfo.length; i++) {
                if (req.query.cid === account.centersInfo[i].cid) {
                    delete account.centersInfo[i];
                    break;
                }
            }
            account.save(function (err) {
                if (err) {
                    res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                    res.end();
                } else {
                    res.write(JSON.stringify({status: "succ", result: {username: account.username, cid: req.query.cid}}));
                    res.end();
                }
            })
        }
    });
});


module.exports = router;