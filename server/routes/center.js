var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;
var search = require('../helpers/util');
var multer  = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer().single('userFile');

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
                        timestamp: new Date().valueOf()
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
                account.centersInfo[i].timestamp = new Date().valueOf();;

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



router.post('/upload',  function(req,res){
    upload(req, res, function(err) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
            res.end();
        } else {
            res.write(JSON.stringify({status: "succ", result: {cid: path.parse(req.file.filename).name, types: path.extname(req.file.originalname)}}));
            res.end();
        }
    });
});

router.post('/save', function(req, res) {
    Account.findOne({ 'centersInfo.cid' : req.body.cid}, 'centersInfo', function (err, account) {
        var i;
        for (i = 0; i < account.centersInfo.length; i++) {
            if (account.centersInfo[i].cid === req.body.cid)
                break;
        }
        if (account.centersInfo[i].img == null) {
            account.centersInfo[i].img = [];
        }
        account.centersInfo[i].img.push({
            data : fs.readFileSync("./uploads/" + req.body.cid + req.body.types),
            contentType : 'image/png'
        });

        console.log(account);
        account.save(function (err) {
            if (err) {
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't save"}}));
                res.end();
            } else {
                res.write(JSON.stringify({status: "succ", result: {msg: "saved"}}));
                res.end();
            }
        })
    });
    // res.render('upload');
});


router.get('/display', function(req, res) {
    Account.findOne({ 'centersInfo.cid' : req.query.cid}, 'centersInfo', function (err, account) {
        var i;
        for (i = 0; i < account.centersInfo.length; i++) {
            if (account.centersInfo[i].cid === req.query.cid)
                break;
        }
        res.contentType(account.centersInfo[i].img[0].contentType);
        res.send(account.centersInfo[i].img[0].data);
    });
});

/*
--------input--------:
http://localhost:3000/popular

--------output--------:
{
   "status":"succ",
   "result":{
      "centersInfo":[
         {
            "cid":"98877328-2657-46fd-b089-d8ffbee29522",
            "title":"open architecture",
            "content":"Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
            "size":66,
            "timestamp":20171965,
            "price":100,
            "location":{
               "street":"4444 Rowland Drive",
               "zip":10041
            }
         },
         {
            "cid":"37d1c65b-f66e-4054-8777-6eddf4caf98b",
            "title":"3rd generation",
            "content":"Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
            "size":82,
            "timestamp":20178882,
            "price":100,
            "location":{
               "street":"91043 Riverside Parkway",
               "zip":10062
            }
         },
         {
            "cid":"20170429",
            "title":"Carer Post",
            "content":"Etiam fau. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
            "size":50,
            "timestamp":20173949,
            "price":100,
            "location":{
               "street":"Columbia University",
               "zip":10027,
               "lat":40.8075355,
               "lng":-73.9625727,
               "city":"New York",
               "state":"NY"
            }
         }
      ]
   }
}
*/
router.get('/popular', function(req, res) {
    Account.find({}, 'ordersInfo', function (err, account) {
        if (err || account === null) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
            res.end();
        }
        else {
            var cid_dict = [];
            for (var i = 0; i < account.length; i++) {
                for (var j = 0; j < account[i].ordersInfo.length; j++) {
                    var cur_cid = account[i].ordersInfo[j].cid;
                    var need_push = true;
                    for (var k = 0; k < cid_dict.length; k++) {
                        if (cid_dict[k].cid === cur_cid) {
                            cid_dict[k].count++;
                            need_push = false;
                            break;
                        }
                    }
                    if (need_push) {
                        cid_dict.push({cid: cur_cid, count: 1});
                    }
                }
            }
            cid_dict.sort(function(a, b) {
                return b.count - a.count
            });
            cid_dict = cid_dict.slice(0, 20);
            var cids = [];
            for (var i = 0; i < cid_dict.length; i++) {
                cids.push(cid_dict[i].cid);
            }
            console.log(cids);
            Account.find({ 'centersInfo.cid' : {"$in": cids}}, 'centersInfo', function (err, account) {
                if (err || account === null) {
                    res.write(JSON.stringify({status: "fail", result: {msg: "Can't find centers information"}}));
                    res.end();
                }
                else {
                    var centers = [];
                    for (var i = 0; i < account.length; i++) {
                        for (var j = 0; j < account[i].centersInfo.length; j++) {
                            cur_cid = account[i].centersInfo[j].cid;
                            // found = false;
                            for (var k = 0; k < cids.length; k++) {
                                if (cur_cid === cids[k]) {
                                    // found = true;
                                    centers.push(account[i].centersInfo[j]);
                                    break;
                                }
                            }
                            // if (found) {
                            //     break;
                            // }
                        }
                    }
                }
                res.write(JSON.stringify({status: "succ", result: {centersInfo: centers}}));
                res.end();
            });
        }
    });
});

module.exports = router;


