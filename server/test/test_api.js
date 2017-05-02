
var chai = require('chai')
var expect = chai.expect


describe('test user functions', function() {
    this.timeout(15000);

    var myDate = new Date();
    var username = "master" + myDate.getTime().toString()

    it('test user register - case1', function(done) {

        var request = require('request');
        var formData = {
            username: username,
            password: "master",
            birth: 1995,
            gender: "male",
            email: "master@gmail.com",
            phone: "9290000001"
        };
        request.post({url:'http://localhost:3000/register', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });


    it('test user login (correct login)', function(done) {
        var request = require('request');
        var formData = {     
            username: username,
            password: "master"
        };
        request.post({url:'http://localhost:3000/login', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test user login (incorrect login)', function(done) {
        var request = require('request');
        var formData = {
            username: "None",
            password: "None"
        };
        request.post({url:'http://localhost:3000/login', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("fail");
            done();
        });
    });



    it('test put basicInfo', function(done) {
        var formData = {
            username: "master",
            birth: 1993,
            gender: "male",
            email: "master@gmail.com",
            phone: "9292081000"
        };
        var request = require('request');
        request.put({url:'http://localhost:3000/basicInfo', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test get basicInfo', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/basicInfo?username=master'}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            expect(body.result.username).to.equal("master");
            expect(body.result.birth).to.equal(1993);
            expect(body.result.gender).to.equal("male");
            expect(body.result.email).to.equal("master@gmail.com");
            expect(body.result.phone).to.equal("9292081000");
            done();
        });
    });

});



describe('test center functions', function() {
    this.timeout(15000);


    // it('test getPetsInfo', function(done) {
    //     var request = require('request');
    //     request.get({url:'http://localhost:3000/petsInfo?username=test2'}, function optionalCallback(err, res, body) {
    //         var body = JSON.parse(body);
    //         expect(err).to.equal(null);
    //         expect(body.status).to.equal("succ");
    //         done();
    //     });
    // });
    it('test post centersInfo', function(done) {
        var formData = {
            username: "master",
            cid: "20170429",
            title: "master center",
            content: "master center content",
            street: "Columbia University",
            city: "New York",
            state: "NY",
            size: 15
        };
        var request = require('request');
        request.post({url:'http://localhost:3000/centersInfo', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test put centersInfo', function(done) {
        var formData = {
            username: "master",
            cid: "20170429",
            title: "master center revised",
            content: "master center content",
            street: "Columbia University",
            city: "New York",
            state: "NY",
            size: 15,
        };
        var request = require('request');
        request.put({url:'http://localhost:3000/centersInfo', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test get centersInfo', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/centersInfoSpec?username=master&cid=20170429'}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });



    it('test delete centersInfo', function(done) {
        var formData = {
            username: "master",
            cid: "20170429",
        };
        var request = require('request');
        request.delete({url:'http://localhost:3000/centersInfo', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });


    // it('test getOrder', function(done) {
    //     var request = require('request');
    //     request.get({url:'http://localhost:3000/order/getOrder?username=test2'}, function optionalCallback(err, res, body) {
    //         var body = JSON.parse(body);
    //         expect(err).to.equal(null);
    //         expect(body.status).to.equal("succ");
    //         done();
    //     });
    // });
});

describe('test order functions', function() {
    this.timeout(15000);

    var oid;
    it('test post ordersInfo', function(done) {
        var formData = {
            username: "kaihe",
            msg: "Test in TravisCI",
            cid: "59078f24df4eb93573013ad8"
        };
        var request = require('request');
        request.post({url:'http://localhost:3000/ordersInfo', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            oid = body.result.oid;
            done();
        });
    });


    it('test get ordersInfo', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/ordersInfoSpec?username=kaihe&oid='+oid}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            expect(body.result.ordersInfo.contact.username).to.equal("zehao");
            done();
        });
    });


    it('test delete ordersInfo', function(done) {
        var formData = {
            username: "kaihe",
            oid: oid
        };
        var request = require('request');
        request.delete({url:'http://localhost:3000/ordersInfo', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });


    // it('test getOrder', function(done) {
    //     var request = require('request');
    //     request.get({url:'http://localhost:3000/order/getOrder?username=test2'}, function optionalCallback(err, res, body) {
    //         var body = JSON.parse(body);
    //         expect(err).to.equal(null);
    //         expect(body.status).to.equal("succ");
    //         done();
    //     });
    // });
});


describe('test search functions', function() {
    this.timeout(15000);


    it('test get addr', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/addr?location=Columbia Univeristy'}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            expect(body.result.coordinate.lat).to.equal(40.8075355);
            expect(body.result.coordinate.lng).to.equal(-73.9625727);
            expect(body.result.zipcode).to.equal("10027");
            done();
        });
    });

    it('test get near', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/near?zipcode=10027&lat=12&lng=20'}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });
});



