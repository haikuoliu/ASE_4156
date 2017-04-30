var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;


router.get('/ordersInfoUser', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'ordersInfo', function (err, account) {
        if (err || account === null ||account.ordersInfo === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find orders information"}}));
            res.end();
        }
        else {
            res.write(JSON.stringify({status: "succ", result: {ordersInfo: account.ordersInfo}}));
            res.end();
        }
    });
});

router.get('/ordersInfoSpec', function(req, res) {
    var oid = req.query.oid;
    // console.log(cid);
    Account.findOne({ 'ordersInfo.oid' : oid}, 'ordersInfo', function (err, account) {
        if (err || account === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find orders information"}}));
            res.end();
        }
        else {
            // console.log(account);
            for (var i = 0; i < account.ordersInfo.length; i++) {
                // console.log(account.centersInfo[i]);
                // console.log(account.centersInfo[i].cid);
                if (oid === account.ordersInfo[i].oid) {
                    res.write(JSON.stringify({status: "succ", result: {ordersInfo: account.ordersInfo[i]}}));
                    res.end();
                    return;
                }
            }
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find orders information"}}));
            res.end();
        }
    });
});


router.post('/ordersInfo', function (req, res) {
    // create centersInfo
    // console.log(req.body.username);
    Account.findOne({ 'username' : req.body.username}, 'username email phone centersInfo ordersInfo', function(err, owner) {
        if (err || owner === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user"}}));
            res.end();
        } else {
            console.log("owner = " + owner);

            Account.findOne({ 'centersInfo.cid' : req.body.cid}, 'username email phone centersInfo ordersInfo', function(err, carer) {
                if (err || carer === null) {
                    res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user"}}));
                    res.end();
                } else {

                    // console.log("carer = " + carer);

                    var id = new ObjectID().toString();
                    var date = new Date().valueOf();
                    if (req.body.oid != null)
                        id = req.body.oid;

                    var i;
                    for (i = 0; i < carer.centersInfo.length; i++) {
                        if (req.body.cid === carer.centersInfo[i].cid) {
                            break;
                        }
                    }

                    // console.log("owner order = " + typeof owner.ordersInfo);

                    owner.ordersInfo.push({
                        oid: id,
                        cid: req.body.cid,
                        types: "Owner",
                        contact: {
                            username: carer.username,
                            email: carer.email,
                            phone: carer.phone
                        },
                        center: {
                            title: carer.centersInfo[i].title,
                            price: carer.centersInfo[i].price,
                            location: carer.centersInfo[i].location,
                            size: carer.centersInfo[i].size
                        },
                        timestamp: date
                    });

                    carer.ordersInfo.push({
                        oid: id,
                        cid: req.body.cid,
                        types: "Carer",
                        contact: {
                            username: owner.username,
                            email: owner.email,
                            phone: owner.phone,
                        },
                        timestamp: date
                    });

                    owner.save(function (err) {
                        if (err) {
                            res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                            res.end();
                        } else {
                            carer.save(function (err) {
                                if (err) {
                                    res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                                    res.end();
                                } else {
                                    res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: req.body.cid}}));
                                    res.end();
                                }
                            });
                        }
                    })

                }
            });

        }
    });
});

router.delete('/ordersInfo', function(req, res) {
    Account.findOne({ 'username' : req.body.username}, 'username ordersInfo', function (err, account1) {
        if (err || account1 === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find orders information"}}));
            res.end();
        }
        else {
            for (var i = 0; i < account1.ordersInfo.length; i++) {
                if (req.body.oid === account1.ordersInfo[i].oid) {
                    //delete account.centersInfo[i];
                    var username2 = account1.ordersInfo[i].contact.username;
                    account1.ordersInfo.splice(i, 1);
                    Account.findOne({ 'username' : username2}, 'username ordersInfo', function (err, account2) {
                        if (err || account2 === null) {
                            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find orders information"}}));
                            res.end();
                        }
                        else {
                            for (var j = 0; j < account2.ordersInfo.length; j++) {
                                if (req.body.oid === account2.ordersInfo[j].oid) {
                                    account2.ordersInfo.splice(j, 1);
                                }
                            }
                        }
                        account1.save(function (err) {
                            if (err) {
                                res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                                res.end();
                            } else {
                                account2.save(function (err) {
                                    if (err) {
                                        res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                                        res.end();
                                    } else {
                                        res.write(JSON.stringify({status: "succ", result: {username: req.body.username, oid: req.body.oid}}));
                                        res.end();
                                    }
                                });
                            }
                        })
                    });
                }
            }
        }
    });
});


module.exports = router;