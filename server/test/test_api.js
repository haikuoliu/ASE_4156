
var chai = require('chai')
var expect = chai.expect


describe('test user functions', function() {
    this.timeout(15000);

    it('test user register', function(done) {
        var myDate = new Date();

        var request = require('request');
        var formData = {
            username: "zehao" + myDate.getTime().toString(),
            password: "zehao",
            birth: 1995,
            gender: "male",
            email: "zehao@gmail.com",
            phone: "123"
        };
        request.post({url:'http://localhost:3000/register', formData: formData}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test user login', function(done) {
        var request = require('request');
        var formData = {     
            username: "master",
            password: "master"
        };
        request.post({url:'http://localhost:3000/login', formData: formData}, function optionalCallback(err, res, body) {
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
            expect(body.result.birth).to.equal(20170425);
            expect(body.result.gender).to.equal("male");
            expect(body.result.email).to.equal("master@columbia.edu");
            expect(body.result.phone).to.equal("9292081111");
            done();
        });
    });

    it('test put basicInfo', function(done) {
        var formData = {
            username: "master1",
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

    it('test get centersInfo', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/centersInfo?username=master&cid=5904bec68c5ce60eeffa6d72'}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test post centersInfo', function(done) {
        var formData = {
            username: "master",
            cid: "20170429",
            title: "master center",
            content: "master center content",
            street: "Columbia University",
            city: "New York",
            state: "NY",
            size: 15,
            timestamp: 201704291413
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
            timestamp: 201704291413
        };
        var request = require('request');
        request.put({url:'http://localhost:3000/centersInfo', formData: formData}, function optionalCallback(err, res, body) {
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


// describe('test post functions', function() {           
//     this.timeout(15000);

//     // it('test addPost', function(done) {
//     //     var request = require('request');
//     //     var formData = {     
//     //         username: "zehao",
//     //         birth: '2017-03-08',
//     //         gender: 'male',
//     //         email: 'aa@gmail.com',
//     //         phone: 'adfasd'
//     //     };
//     //     request.post({url:'http://localhost:3000/addPost', formData: formData}, function optionalCallback(err, res, body) {
//     //         var body = JSON.parse(body);
//     //         expect(err).to.equal(null);
//     //         expect(body.status).to.equal("succ");
//     //         done();
//     //     });
//     // });

//     it('test getPost', function(done) {
//         var request = require('request');
//         request.get({url:'http://localhost:3000/getPost?username=zehao'}, function optionalCallback(err, res, body) {
//             console.log(body);
//             var body = JSON.parse(body);
            
//             expect(err).to.equal(null);
//             expect(body.status).to.equal("succ");
//             done();
//         });
//     });

// });


