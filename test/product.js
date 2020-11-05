//var expect  = require('chai').expect;
var request = require('request');
//var should = require('chai').should();

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('Status and content', function() {
    describe ('Main page', function() {
        it('status', function(done){
            request('http://localhost:3000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:3000/' , function(error, response, body) {
                expect(body).to.equal("OK");
                //response.body.should.be.a('object');
                done();
            });
        });
    });

});