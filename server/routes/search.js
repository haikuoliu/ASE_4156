/**
 * Created by longlong on 4/10/17.
 */
var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var search = require('../helpers/util');


/*
--------input--------:
http://localhost:3000/addr?location=180 Claremont Ave

--------output--------:
{
    "status":"succ",
    "result":{
        "coordinate":{
            "lat":40.8143426,
            "lng":-73.9604739
        },
        "zipcode":"10027"
    }
}
*/
router.get('/addr', function(req, res) {
    var addr = req.query.location;
    console.log(addr);
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

/*
--------input--------:
http://localhost:3000/near?zipcode=10027&lat=12&lng=20

--------output--------:
{
    "status":"succ",
    "result":{
        "centersInfo":[
            {
                "cid":"d4bdc3d8-03e3-433f-bdb8-3f794bede318",
                "title":"service-desk",
                "content":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
                "size":127,
                "timestamp":20178861,
                "location":{
                    "street":"7 Pearson Park",
                    "zip":10027
                }
            },
            {
                "cid":"50a41ba8-aa82-4094-bc16-33763919c29c",
                "title":"Virtual",
                "content":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.","size":33,"timestamp":20174760,
                "location":{
                    "street":"415 Upham Drive",
                    "zip":10027
                }
            }
        ]
    }
}

*/
router.get('/near', function (req,res) {
   var query_sentence = {};
   var cent_lat = req.query.lat;
   var cent_lng = req.query.lng;
   if (req.query.zipcode === undefined) {
       query_sentence = {}
   }
   else {
       var zipcode = Number(req.query.zipcode);
       var scope = 3;
       var zips = [];
       for (i = zipcode - scope; i < zipcode + scope; i++) {
           zips[i - (zipcode - scope)] = i;
       }
       query_sentence = { 'centersInfo.location.zip' : {"$in": zips}};
   }

   Account.find(query_sentence, 'centersInfo', function (err, account) {
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
                   if (req.query.zipcode === undefined) {
                       res_centers.push(centers[j]);
                   }
                   else {
                       for (var k = 0; k < zips.length; k++) {
                           if (centers[j].location.zip == zips[k]) {
                               res_centers.push(centers[j]);
                               break;
                           }
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
