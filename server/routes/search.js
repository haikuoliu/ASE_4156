/**
 * Created by longlong on 4/10/17.
 */
var express = require('express');
var router = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCYAXFUzdidNb5J_EnXz9Pa6Jbsedt6FdM'
});
var Account = require('../models/account');


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

router.post('/addr', function(req, res) {
    var addr = req.body.location;
    // console.log(addr);
    searchAddress(addr, function(coord,zipcode) {
        if (coord!=null) {
            res.write(JSON.stringify({status: "succ", result: {coordinate: coord, zipcode: zipcode}}));
            res.end();
        } else {
            res.write(JSON.stringify({status: "fail", result: {msg: "Search request filaed"}}));
            res.end();
        }
    });
});


router.post('/geo', function (req,res) {
   var zipcode = Number(req.body.zipcode);
   var scope = 3;
   zips = [];
   for (i = zipcode - scope; i < zipcode + scope; i++) {
       zips[i - (zipcode - scope)] = i;
   }
   Account.find({ 'centersInfo.location.zip' : {"$in": zips}}, 'centersInfo', function (err, account) {
       // when there is error
       if (err || account == null) {
           res.write(JSON.stringify({status: "fail", result: {msg: "Can't find location"}}));
           res.end();
       }
       else {
           var locations = [];
           for (i = 0; i < account.length; i++) {
               centers = account[i].centersInfo;
               for (j = 0; j < centers.length; j++) {
                   for (k = 0; k < zips.length;k++) {
                       if (centers[j].location.zip == zips[k]) {
                           locations.push(centers[j]);
                           break;
                       }
                   }
               }
           }

           res.write(JSON.stringify({
               status: "succ", result: {
                   centersInfo: locations
               }
           }));
           res.end();
       }
   });
});


module.exports = router;