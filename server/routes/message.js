/**
 * Created by longlong on 4/28/17.
 */
var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var twilioKeys = require('../config/twillio-keys').twilioKeys;
var client = new twilio.RestClient(twilioKeys.AccountSID, twilioKeys.AuthToken);


router.post('/msg', function(req, res) {
    console.log(req.body.content);
    client.messages.create({
        body: req.body.content,
        to: '+1 929-208-9515',
        from: twilioKeys.TwilioNumber
//  mediaUrl: imageUrl
    }, function(err, data) {
        if (err) {
            console.error('Could not notify kuokuo');
            console.error(err);
        } else {
            console.log('kuokuo notified');
        }
    });
    res.write(JSON.stringify({status: "succ", result: "sent to kuokuo"}));
    res.end();
});

// var AWS = require('aws-sdk');
// var awsKeys = require('./config/es-keys').esKeys;
// var sns = new AWS.SNS({apiVersion: '2010-03-31'});

// AWS.config.update({
//     accessKeyId: awsKeys.accessKeyId,
//     secretAccessKey: awsKeys.secretAccessKey,
//     region: awsKeys.region
// });
//
// sns.createPlatformEndpoint({
//     PlatformApplicationArn: '{APPLICATION_ARN}',
//     Token: '{DEVICE_TOKEN}'
// }, function (err, data) {
//     if (err) {
//         console.log(err.stack);
//         return;
//     }
//
//     var endpointArn = data.EndpointArn;
//
//     var payload = {
//         default: 'Hello World',
//         APNS: {
//             aps: {
//                 alert: 'Hello World',
//                 sound: 'default',
//                 badge: 1
//             }
//         }
//     };
//     // first have to stringify the inner APNS object...
//     payload.APNS = JSON.stringify(payload.APNS);
//     // then have to stringify the entire message payload
//     payload = JSON.stringify(payload);
//
//     console.log('sending push');
//     sns.publish({
//         Message: payload,
//         MessageStructure: 'json',
//         TargetArn: endpointArn
//     }, function (err, data) {
//         if (err) {
//             console.log(err.stack);
//             return;
//         }
//
//         console.log('push sent');
//         console.log(data);
//     });
// });

module.exports = router;