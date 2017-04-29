/**
 * Created by longlong on 4/10/17.
 */
var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var search = require('../helpers/util');

router.post('/addr', function(req, res) {
    var addr = req.body.location;
    // console.log(addr);
    search.searchAddress(addr, function(coord,zipcode) {
        if (coord!=null) {
            res.write(JSON.stringify({status: "succ", result: {coordinate: coord, zipcode: zipcode}}));
            res.end();
        } else {
            res.write(JSON.stringify({status: "fail", result: {msg: "Search request failed"}}));
            res.end();
        }
    });
});

function cal_dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}


router.post('/geo', function (req,res) {
   var zipcode = Number(req.body.zipcode);
   var cent_lat = req.body.lat;
   var cent_lng = req.body.lng;
   var scope = 3;
   var zips = [];
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
           var res_centers = [];
           for (var i = 0; i < account.length; i++) {
               var centers = account[i].centersInfo;
               for (var j = 0; j < centers.length; j++) {
                   for (var k = 0; k < zips.length;k++) {
                       if (centers[j].location.zip == zips[k]) {
                           res_centers.push(centers[j]);
                           break;
                       }
                   }
               }
           }
           var alat = 0;
           var alng = 0;
           var blat = 0;
           var blng = 0;
           res_centers.sort(function(a, b) {
               if (a.location.lat === undefined) {
                   alat = cent_lat;
               }
               else {
                   alat = a.location.lat;
               }

               if (a.location.lng === undefined) {
                    alng = cent_lng;
               }
               else {
                    alng = a.location.lng;
               }

               if (b.location.lat === undefined) {
                    blat = cent_lat;
               }
               else {
                    blat = b.location.lat;
               }

               if (b.location.lng === undefined) {
                    blng = cent_lng;
               }
               else {
                    blng = b.location.lng;
               }

               return cal_dist(alat, cent_lat, alng, cent_lng) - cal_dist(blat, cent_lat, blng, cent_lng);
           });

           // we want the nearest 20
           res_centers = res_centers.slice(0, 20);

           res.write(JSON.stringify({
               status: "succ", result: {
                   centersInfo: res_centers
               }
           }));
           res.end();
       }
   });
});


module.exports = router;
