/**
 * Created by longlong on 3/21/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    // username: String,
    facebook         : {
        id           : String,
        token        : String,
        // email        : String,
        name         : String
    },
    birth: Number, //Schema.Timestamp,
    gender: String,
    email: String,
    phone: String,
    petsInfo: [{
        species: String,
        birth: Number
    }],
    centersInfo: [{
        cid: Schema.Types.ObjectId,
        title: String,
        content: String,
        location: {
            lat: Number,
            lng: Number,
            street: String,
            city: String,
            state: String,
            zip: Number
        },
        size: Number,
        timestamp: Number
    }],
    order: [{
        oid: Schema.Types.ObjectId,
        content: String,
        timestamp: Number
    }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
