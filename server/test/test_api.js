
var chai = require('chai')
var expect = chai.expect


describe('test user login functions', function() {           
    this.timeout(15000);
    it('test user login', function(done) {
        var request = require('request');
        var formData = {     
            username: "zehao",
            password: "zehao"
        };
        request.post({url:'http://localhost:3000/login', formData: formData}, function optionalCallback(err, res, body) {
            console.log(body);
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

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
            console.log(body);
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });

    it('test getBasicInfo', function(done) {
        var request = require('request');
        request.get({url:'http://localhost:3000/getBasicInfo?username=zehao'}, function optionalCallback(err, res, body) {
            var body = JSON.parse(body);
            expect(err).to.equal(null);
            expect(body.status).to.equal("succ");
            done();
        });
    });
});


