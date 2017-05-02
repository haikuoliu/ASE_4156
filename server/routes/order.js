var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;
var util = require('../helpers/util');

/*
 --------input--------:
 http://localhost:3000/ordersInfoUser?username=owner

 --------output--------:
{
    "status":
        "succ",
    "result":
    {
        "ordersInfo":
        [
            {
                "oid": "59054404f839cd1af1eb67fa",
                "cid": "20170429",
                "types": "Owner",
                "timestamp": 1493517316293,
                "_id": "59054404f839cd1af1eb67fb",
                "center": {
                    "title": "Carer Post",
                    "price": 100,
                    "size": 50,
                    "location": {
                        "state": "NY",
                        "city": "New York",
                        "lng": -73.9625727,
                        "lat": 40.8075355,
                        "zip": 10027,
                        "street": "Columbia University"
                    }
                },
                "contact": {
                    "username": "carer",
                    "email": "carer@gmail.com",
                    "phone": "5424210266"
                }
            },
            {
                "oid": "5905448cf839cd1af1eb6800",
                "cid": "98877328-2657-46fd-b089-d8ffbee29522",
                "types": "Owner",
                "timestamp": 1493517452326,
                "_id": "5905448cf839cd1af1eb6801",
                "center": {
                    "title": "open architecture",
                    "price": 100,
                    "size": 66,
                    "location": {
                        "zip": 10041,
                        "street": "4444 Rowland Drive"
                    }
                },
                "contact": {
                    "username": "rrussam1",
                    "email": "jgrelak1@nbcnews.com",
                    "phone": "8553116127"
                }
            }
        ]
    }
}
 */
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


/*
 --------input--------:
 http://localhost:3000/ordersInfoSpec?username=owner&oid=59054404f839cd1af1eb67fa

 --------output--------:
{
    "status": "succ",
    "result": {
    "ordersInfo": [
        {
            "oid": "59054404f839cd1af1eb67fa",
            "cid": "20170429",
            "types": "Owner",
            "timestamp": 1493517316293,
            "_id": "59054404f839cd1af1eb67fb",
            "center": {
                "title": "Carer Post",
                "price": 100,
                "size": 50,
                "location": {
                    "state": "NY",
                    "city": "New York",
                    "lng": -73.9625727,
                    "lat": 40.8075355,
                    "zip": 10027,
                    "street": "Columbia University"
                }
            },
            "contact": {
                "username": "carer",
                "email": "carer@gmail.com",
                "phone": "5424210266"
            }
        },
        {
          "oid": "59079d8e69192c4459c824b4",
          "cid": "59078f24df4eb93573013ad8",
          "types": "Carer",
          "timestamp": 1493671310133,
          "_id": "59079d8e69192c4459c824b6",
          "contact": {
              "username": "kaihe",
              "email": "kaihe@columbia.edu",
              "phone": "9292089515"
          }
        }
        ]
    }
}*/
router.get('/ordersInfoSpec', function(req, res) {
    var oid = req.query.oid;
    // console.log(cid);
    Account.findOne({ 'username' : req.query.username}, 'ordersInfo', function (err, account) {
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



/*
 --------input--------:
 http://localhost:3000/ordersInfo
 username: "owner"
 msg: "send message",
 cid: "5a940412-ce8a-4bb5-9ee7-a714e5aa3c56"

 --------output--------:
{
    "status": "succ",
    "result": {
        "ownerName": "owner",
        "carerName": "carer",
        "cid": "5a940412-ce8a-4bb5-9ee7-a714e5aa3c56",
        "oid": "59054aecd5a3c91b5f7071b3"
    }
} */
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
                                    util.sendMessage("You center has been booked! Message from Pets Owner" + req.body.msg, carer.phone, function () {
                                       util.sendMessage("You have just made an order!", owner.phone, function () {
                                           res.write(JSON.stringify({status: "succ", result: {ownerName: owner.username, carerName: carer.username, cid: req.body.cid, oid: id}}));
                                           res.end();
                                       });
                                    });
                                }
                            });
                        }
                    })

                }
            });

        }
    });
});


/*
 --------input--------:
 http://localhost:3000/ordersInfo
 username: "owner"
 oid: "59054aecd5a3c91b5f7071b3"

 --------output--------:
{
    "status": "succ",
    "result": {
    "username": "owner",
        "oid": "59054aecd5a3c91b5f7071b3"
    }
}
*/
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
