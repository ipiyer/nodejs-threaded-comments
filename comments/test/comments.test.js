var app = require('../../app.js');
var should = require('should');
var request = require('supertest');


describe('comments', function(){
    describe('GET /comments/', function(){
        it('respond with json', function(done){
            request(app)
                .get('/comments')
                .expect('Content-Type', /text\/html/)
                .expect(200)
                .end(function(err, res){
                    if(err) throw err;
                    done();
                })
        });
    });
    
    describe('POST /comments/', function(){
        it('valid paramenters should respond with 200', function(done){
            request(app)
                .post('/comments/')
                .send({ comment: 'hola dude', parentID: 'a12asd123', messageID: "as1213" })
                .expect('Content-Type', /text\/html/)
                .expect(200)
                .end(function(err, res){
                    if(err) {console.log(err); throw err};
                    done();
                })
        });

        it('invalid parameters should respond with 404', function(done){
            request(app)
                .post('/comments/')
                .send({ comment: ' ', parentID: 'a12asd123', messageID: "as1213" })
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function(err, res){
                    if(err) {console.log(err); throw err};
                    done();
                })
        });

    });
    
})





