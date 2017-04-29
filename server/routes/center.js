var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCYAXFUzdidNb5J_EnXz9Pa6Jbsedt6FdM'
});

function searchAddress(address, callback) {
    console.log('Search Address')
    // Geocode an address.
    googleMapsClient.geocode({
        address: address
    }, function(err, response) {
        if (!err) {
            var coord = response.json.results[0].geometry.location;
            // console.log("success: ",coord);
            var zipcode;
            if (response.json.results[0].address_components[6].types[0] === "postal_code")
                zipcode = response.json.results[0].address_components[6].long_name;
            else if (response.json.results[0].address_components[7].types[0] === "postal_code")
                zipcode = response.json.results[0].address_components[7].long_name;
            // console.log("success: ",zipcode);
            callback(coord, zipcode);
            // return {coord:coord,zipcode:zipcode};
        } else {
            console.log("The Geocode was not successful for the following reason: " + status);
            return null;
        }

    });
}


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
            searchAddress(req.body.street, function(coord,zipcode) {
                if (coord!=null) {
                    account.centersInfo.push({
                        cid: objectId,
                        title: req.body.title,
                        content: req.body.content,
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
                            res.write(JSON.stringify({status: "succ", result: {username: req.body.username, cid: objectId}}));
                            res.end();
                        }
                    })
                } else {
                    res.write(JSON.stringify({status: "fail", result: {msg: "Search request failed"}}));
                    res.end();
                }
            });

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
            var i;
            for (i = 0; i < account.centersInfo.length; i++) {
                if (req.body.cid === account.centersInfo[i].cid.toString()) {
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
                if (req.body.city != null)
                    account.centersInfo[i].location.city = req.body.city;
                if (req.body.state != null)
                    account.centersInfo[i].location.state = req.body.state;
                if (req.body.timestamp != null)
                    account.centersInfo[i].timestamp = req.body.timestamp;

                if (req.body.street != null)
                {
                    searchAddress(req.body.street, function(coord,zipcode) {
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