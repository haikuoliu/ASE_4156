var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();






//
// router.get('/getPost', function(req, res) {
//     Account.findOne({ 'username' : req.query.username}, 'username post', function (err, account) {
//         if (err) {
//             res.write(JSON.stringify({status: "fail", result: {msg: "Can't find post information"}}));
//             res.end();
//         }
//         // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
//         // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
//         else {
//             res.write(JSON.stringify({status: "succ", result: {post: account.post}}));
//             res.end();
//         }
//     });
// });

router.get('/getOrder', function(req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username order', function (err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find order information"}}));
            res.end();
        }
        // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
        // console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
        else {
            res.write(JSON.stringify({status: "succ", result: {order: account.order}}));
            res.end();
        }
    });
});

router.post('/addPost', function (req, res) {
    Account.findOne({ 'username' : req.body.username}, 'username post', function(err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find post information"}}));
            res.end();
        }
        else {
            account.post.push({eid: req.body.eid, title: req.body.title, content: req.body.content, description: req.body.description});
            res.write(JSON.stringify({status: "succ", result: {username: req.body.username, eid: req.body.eid}}));
            res.end();
        }
    });
});

router.get('/getPost', function (req, res) {
    Account.findOne({ 'username' : req.query.username}, 'username post', function(err, account) {
        if (err) {
            res.write(JSON.stringify({status: "fail", result: {msg: "Can't find post information"}}));
            res.end();
        }
        else {
            for (var i = 0; i < account.post.length; i++) {
                if (req.query.eid == account.post[i].eid) {
                    res.write(JSON.stringify({status: "succ", result: {username: account.username, eid: account.post[i].eid, title: account.post[i].title, content: account.post[i].content, description: account.post[i].content}}));
                }
            }
            res.end();
        }
    });
});

// router.get('/getPost', function (req, res) {
//     Account.findOne({ 'username' : req.query.username, 'post.eid' : req.query.eid}, 'username post', function(err, account) {
//         if (err) {
//             res.write(JSON.stringify({status: "fail", result: {msg: "Can't find post information"}}));
//             res.end();
//         }
//         else {
//             res.write(JSON.stringify({status: "succ", result: {username: account.username, eid: account.post.eid, title: account.post.title, content: account.post.content, description: account.post.content}}));
//             res.end();
//         }
//     });
// });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// router.get('/profile', function (req, res) {
//     Account.findOne({ 'username' : req.session.passport.user}, 'username birth gender email phone', function (err, account) {
//         if (err) return handleError(err);
//         // res.render('/profile', {username : account.username, birth : account.birth, gender : account.gender, email : account.email, phone : account.phone});
//         console.log("username : " + account.username + " birth : " + account.birth + " gender : " + account.gender + " email : " + account.email + " phone " + account.email);
//         res.status(200).send("cool");
//     });
//     // res.status(200).send("cool");
// })

router.get('/ping', function(req, res){
    Account.register(new Account({
        username : "test0",
        birth : "1994",
        gender : "male",
        email : "test3@aa.com",
        phone : "982232",
        petsInfo: [
            {
                species: "small cat",
                birth: "2002"
            }
        ],
        centersInfo: [
            {
                location: "country",
                size: "small"
            }
        ],
        post: [
            {
                eid: "1",
                title: "test",
                content: "test test test",
                description: "test test"
            }
        ],
        order: [
            {
                id: "43289423",
                time: "9281443",
                content: "third"
            }]}), "test", function(err, account) {});
    res.status(200).send("pong!");
});

// router.get('/test', function (req, res) {
//     console.log(req.session);
//     console.log("-------------");
//     console.log(req.body);
//     console.log("-------------");
//     console.log(req.user);
//     Account.find(function (err, account) {
//         if (err) return console.error(err);
//         console.log(account);
//         // if (req.session.passport.user == account.username) console.log(account);
//     })
//     res.status(200).send(req.session.passport.user);
// })

module.exports = router;
