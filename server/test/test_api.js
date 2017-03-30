
var chai = require('chai')
var expect = chai.expect


describe('test user login functions', function() {              // describe函数声明一组测试用例
        it('test user login', function(done) { // it函数声明一个测试用例
            this.timeout(15000);
            var request = require('request');
            var formData = {       // 构造get的请求参数
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
    });