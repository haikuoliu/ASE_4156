/**
 * Created by longlong on 4/27/17.
 */

var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Account = require('../models/account');
var configAuth = require('../config/auth');
var router = express.Router();
// var rp = require('request-promise');
var notp = require('notp');


//fb strategy
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'gender', 'email', 'birthday'],
        // passReqToCallback : true

    },

    // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // find the user in the database based on their facebook id
            Account.findOne({'facebook.id': profile.id}, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // ---------- for development purpose only!! -------------
                if (user) {
                    user.remove(function (err) {
                        console.log("error in remove older user!");
                    });
                    console.log("removed old Long Long!");
                    user = null;
                }
                // ---------- for development purpose only!! -------------

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new Account();

                    // set all of the facebook information in our user model
                    newUser.facebook.id = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.gender = profile.gender;
                    var raw_birth = profile._json.birthday.split('/');
                    newUser.birth = raw_birth[2];
                    // save our user to the database

                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    })
);

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


router.get('/fblogin', passport.authenticate('facebook', {scope: ['email', 'user_birthday']}));

// handle the callback after facebook has authenticated the user
router.get('/fblogin/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        var username = req.user._doc.facebook.name;
        console.log("username: " + username);

        // boolean:
        Account.findOne({'facebook.name': username}, 'username birth gender email phone', function (err, account) {
            if (err) {
                res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
                res.end();
            }
            else {
                console.log("account: " + account);
                if (account == null) {
                    // res.write(JSON.stringify({status: "fail", result: {msg: "Can't find user profile"}}));
                    // res.end();
                    res.redirect("http://localhost:6888/");
                }
                // res.write(JSON.stringify({status: "succ", result: {username: username,
                //     birth : account.birth, gender : account.gender,
                //     email : account.email, phone : account.phone
                // }}));
                // res.end();


                var encoded = notp.totp.gen(username, {});
                var endpoint = 'http://localhost:3000/login?n=' + username + '&secret=' + encoded;
                console.log('endpoint: ', endpoint);
                console.log("encoded: ",encoded);

                res.redirect(endpoint);
            }
        });
    });


router.get('/login', function(req, res) {
    if(notp.totp.verify(req.query.secret, req.query.n, {window:5})) {
        console.log('Success!!!: ', notp.totp.verify(req.query.secret, req.query.n, {window:5}));
    }
    res.end()
    console.log(req);
});


// if(notp.totp.verify(encoded, 'longlong', {window:2})) {
//     console.log('Success!!!: ', notp.totp.verify(encoded, K, {}));
// } else {
//     console.log('failed to verify');
// }


module.exports = router;
