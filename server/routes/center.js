var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;
var search = require('../helpers/util');

// for test only
router.get('/updateCenter', function(req, res) {
    Account.find('username centersInfo', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            account.forEach(function(acc, i)  {
                acc.centersInfo.forEach(function ( center, j) {
                    console.log("street = " + account[i].centersInfo[j].location.street);
                    search.searchAddress(account[i].centersInfo[j].location.street, function(coord,zipcode) {
                        console.log("coord = " + coord + " zip = " + zipcode);
                        if (coord!=null) {
                            account[i].centersInfo[j].location.lat = coord.lat;
                            account[i].centersInfo[j].location.lng = coord.lng;
                            account[i].centersInfo[j].location.city = "New York";
                            account[i].centersInfo[j].location.state = "NY";
                            account[i].centersInfo[j].location.zip = zipcode;

                            console.log("lat = " + coord.lat + " lng = " + coord.lng + " zip = " + zipcode);

                            account[i].save(function (err) {
                                if (err) {
                                    // res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                                    // res.end();
                                    console.log("write error");
                                }
                                else {
                                    console.log("write once");
                                }
                            })

                        } else {
                            // res.write(JSON.stringify({status: "fail", result: {msg: "Search request failed"}}));
                            // res.end();
                            console.log("corrd == null");
                        }
                    });
                })
            });
        }
    });
});

/*
--------input--------:
http://localhost:3000/centersInfoUser?username=zehao

--------output--------:
{
    "status":"succ",
    "result":{
        "centersInfo":[
            {
                "cid":"40380416-8206-4565-a112-efde3bd885d5",
                "title":"parallelism",
                "content":"Pellentesque eget nunc.",
                "size":95,
                "timestamp":20173687,
                "location":{
                    "street":" 326 W 47th St",
                    "zip":10036,
                    "lat":40.7608265,
                    "lng":-73.9889803
                }
            },
            {
                "cid":"9c33d1dd-e6f0-4fed-9ef9-7a7bf9c98682",
                "title":"software",
                "content":"Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                "size":186,
                "timestamp":20178115,
                "location":{
                    "street":"301 Elmside Drive",
                    "zip":77042,
                    "lat":29.7328935,
                    "lng":-95.5431595
                }
            }
        ]
    }
}
*/
router.get('/centersInfoUser', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'centersInfo', function (err, account) {
        if (err || account === null ||account.centersInfo === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        else {
            res.write(JSON.stringify({status: "succ", result: {centersInfo: account.centersInfo}}));
            res.end();
        }
    });
});

/*
--------input--------:
http://localhost:3000/centersInfoSpec?cid=9c33d1dd-e6f0-4fed-9ef9-7a7bf9c98682

--------output--------:
{
    "status":"succ",
    "result":{
        "centersInfo":{
            "cid":"9c33d1dd-e6f0-4fed-9ef9-7a7bf9c98682",
            "title":"software",
            "content":"Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
            "size":186,
            "timestamp":20178115,
            "location":{
                "street":"301 Elmside Drive",
                "zip":77042,
                "lat":29.7328935,
                "lng":-95.5431595
            }
        }
    }
}
 */
router.get('/centersInfoSpec', function(req, res) {
    var cid = req.query.cid;
    // console.log(cid);
    Account.findOne({ 'centersInfo.cid' : cid}, 'centersInfo', function (err, account) {
        if (err || account === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        else {
            // console.log(account);
            for (var i = 0; i < account.centersInfo.length; i++) {
                // console.log(account.centersInfo[i]);
                // console.log(account.centersInfo[i].cid);
                if (cid === account.centersInfo[i].cid) {
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

/*
--------input--------:
http://localhost:3000/centersInfo
username = "zehao"
content = "hahaha"
title = "heihei"
street = "180 Claremont Ave"
city = "New York"
state = "NY"
size = 50
timestamp = 13494949249

--------output--------:
{
    "status":"succ",
    "result":{
        "username":"master",
        "cid":"5904efdd9d7f825835f7461a"
    }
}
 */
router.post('/centersInfo', function (req, res) {
    // create centersInfo
    // console.log(req.body.username);
    Account.findOne({ 'username' : req.body.username}, 'username centersInfo', function(err, account) {
        if (err || account === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user"}}));
            res.end();
        } else {
            var objectId = new ObjectID();
            var id = objectId.toString();
            if (req.body.cid != null)
                id = req.body.cid;
            search.searchAddress(req.body.street, function(coord,zipcode) {
                if (coord!=null) {
                    account.centersInfo.push({
                        cid: id,
                        title: req.body.title,
                        content: req.body.content,
                        price: req.body.price,
                        available: true,
                        location: {
                            lat: coord.lat,
                            lng: coord.lng,
                            street: req.body.street,
                            city: req.body.city,
                            state: req.body.state,
                            zip: zipcode
                        },
                        size: req.body.size,
                        timestamp: req.body.timestamp
                    });
                    account.save(function (err) {
                        if (err) {
                            res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                            res.end();
                        } else {
                            res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: id}}));
                            res.end();
                        }
                    })
                } else {
                    res.write(JSON.stringify({status: "fail", result: {msg: "create center failed"}}));
                    res.end();
                }
            });
        }
    });
});

/*
--------input--------:
http://localhost:3000/centersInfo
username = "zehao"
cid = "5904efdd9d7f825835f7461a"
title = "heihei"
street = "180 Claremont Ave"
city = "New York"
state = "NY"
size = 50
timestamp = 13494949249

--------output--------:
{"status":"succ",
    "result":{
        "username":"master",
        "cid":"5904efdd9d7f825835f7461a"
    }
}
 */
router.put('/centersInfo', function (req, res) {
    // edit centersInfo
    Account.findOne({ 'username' : req.body.username, 'centersInfo.cid' : req.body.cid}, 'username centersInfo', function(err, account) {
        if (err || account === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find center"}}));
            res.end();
        } else {
            var i;
            for (i = 0; i < account.centersInfo.length; i++) {
                if (req.body.cid === account.centersInfo[i].cid) {
                    break;
                }
            }
            if (i === account.centersInfo.length){
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't find center"}}));
                res.end();
            }
            else {
                if (req.body.title != null)
                    account.centersInfo[i].title = req.body.title;
                if (req.body.content != null)
                    account.centersInfo[i].content = req.body.content;
                if (req.body.price != null)
                    account.centersInfo[i].price = req.body.price;
                if (req.body.available != null)
                    account.centersInfo[i].available = req.body.available;
                if (req.body.city != null)
                    account.centersInfo[i].location.city = req.body.city;
                if (req.body.state != null)
                    account.centersInfo[i].location.state = req.body.state;
                if (req.body.timestamp != null)
                    account.centersInfo[i].timestamp = req.body.timestamp;

                if (req.body.street != null)
                {
                    search.searchAddress(req.body.street, function(coord,zipcode) {
                        if (coord!=null) {
                            account.centersInfo[i].location.lat = coord.lat;
                            account.centersInfo[i].location.lng = coord.lng;
                            account.centersInfo[i].location.street = req.body.street;
                            account.centersInfo[i].location.zip = zipcode;

                            account.save(function (err) {
                                if (err) {
                                    res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                                    res.end();
                                } else {
                                    res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: req.body.cid}}));
                                    res.end();
                                }
                            })


                        } else {
                            res.write(JSON.stringify({status: "fail", result: {msg: "Search request failed"}}));
                            res.end();
                        }
                    });
                }
            }


        }
    });
});

/*
--------input--------:
http://localhost:3000/centersInfo
username = "zehao"
cid = "5904efdd9d7f825835f7461a"

--------output--------:
{
    "status":"succ",
    "result":{
        "username":"master"
    }
}
*/
router.delete('/centersInfo', function(req, res) {
    Account.findOne({ 'username' : req.body.username}, 'username centersInfo', function (err, account) {
        if (err || account === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        else {
            for (var i = 0; i < account.centersInfo.length; i++) {
                if (req.body.cid === account.centersInfo[i].cid) {
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
                    });
                    return;
                }
            }
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
    });
});


module.exports = router;