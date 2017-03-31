/**
 * Created by longlong on 3/21/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    // username: String,
    birth: String,
    gender: String,
    email: String,
    phone: String,
    petsInfo: [{
        species: String,
        birth: String
    }],
    centersInfo: [{
        location: String,
        size: String
    }],
    post: [{
        eid: String,
        title: String,
        content: String,
        description: String
    }],
    order: [{
        id: String,
        time: String,
        content: String
    }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
