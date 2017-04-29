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

router.get('/centersInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username centersInfo', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            for (var i = 0; i < account.centersInfo.length; i++) {
                if (req.query.cid === account.centersInfo[i].cid.toString()) {
                    res.write(JSON.stringify({status: "succ", result: {centersInfo: account.centersInfo[i]}}));
                    res.end();
                    return;
                }
            }
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
    });
});


router.post('/centersInfo', function (req, res) {
    // create centersInfo
    Account.findOne({ 'username' : req.body.username}, 'username centersInfo', function(err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user"}}));
            res.end();
        } else {
            var objectId = new ObjectID();
            account.centersInfo.push({
                cid: objectId,
                title: req.body.title,
                content: req.body.content,
                location: {
                    lat: req.body.lat,
                    lng: req.body.lng,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                },
                size: req.body.size,
                timestamp: req.body.timestamp
            });
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
});


router.put('/centersInfo', function (req, res) {
    // edit centersInfo
    Account.findOne({ 'username' : req.body.username, 'centersInfo.cid' : req.body.cid}, 'username centersInfo', function(err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find center"}}));
            res.end();
        } else {
            for (var i = 0; i < account.centersInfo.length; i++) {
                if (req.query.cid === account.centersInfo[i].cid.toString()) {
                    if (req.body.title != null)
                        account.centersInfo[i].title = req.body.title;
                    if (req.body.content != null)
                        account.centersInfo[i].content = req.body.content;
                    if (req.body.lat != null)
                        account.centersInfo[i].location.lat = req.body.lat;
                    if (req.body.lng != null)
                        account.centersInfo[i].location.lng = req.body.lng;
                    if (req.body.street != null)
                        account.centersInfo[i].location.street = req.body.street;
                    if (req.body.city != null)
                        account.centersInfo[i].location.city = req.body.city;
                    if (req.body.state != null)
                        account.centersInfo[i].location.state = req.body.state;
                    if (req.body.zip != null)
                        account.centersInfo[i].location.zip = req.body.zip;
                    if (req.body.size != null)
                        account.centersInfo[i].size = req.body.size;
                    if (req.body.timestamp != null)
                        account.centersInfo[i].timestamp = req.body.timestamp;
                    account.save(function (err) {
                        if (err) {
                            res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                            res.end();
                        } else {
                            res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: req.body.cid}}));
                            res.end();
                        }
                    })
                    return;
                }
            }
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find center"}}));
            res.end();
        }
    });
});

router.delete('/centersInfo', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username centersInfo', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            for (var i = 0; i < account.centersInfo.length; i++) {
                if (req.query.cid === account.centersInfo[i].cid.toString()) {
                    //delete account.centersInfo[i];
                    account.centersInfo.splice(i, 1);
                    account.save(function (err) {
                        if (err) {
                            res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                            res.end();
                        } else {
                            res.write(JSON.stringify({status: "succ", result: {username: account.username, cid: req.query.cid}}));
                            res.end();
                        }
                    })
                    return;
                }
            }
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
    });
});


module.exports = router;