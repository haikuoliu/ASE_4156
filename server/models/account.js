/**
 * Created by longlong on 3/21/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    // username: String,
    birth: Schema.Types.Date, //Schema.Timestamp,
    gender: String,
    email: String,
    phone: String,
    petsInfo: [{
        species: String,
        birth: Schema.Types.Date
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
        timestamp: Schema.Types.Date
    }],
    order: [{
        oid: Schema.Types.ObjectId,
        time: Schema.Types.Date,
        content: String
    }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
