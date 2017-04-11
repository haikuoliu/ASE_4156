/**
 * Created by longlong on 4/10/17.
 */
var express = require('express');
var router = express.Router();
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
            var zipcode = response.json.results[0].address_components[6].long_name;
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
            res.write(JSON.stringify({status: "succ", result: {coordinate: coord,zipcode: zipcode}}));
            res.end();
        } else {
            res.write(JSON.stringify({status: "fail", result: {msg: "Search request filaed"}}));
            res.end();
        }
    });

});


router.post('/geo', function (req,res) {
   var coord = req.body.coordinate;
   //todo: use coord to search databse
});


module.exports = router;