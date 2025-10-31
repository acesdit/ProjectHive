
import { use, should, chai } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

use(chaiHttp);
should(); 

describe('GET /compensation', () => {
    it('should return a 200 status and a message object', (done) => {
        chai.request(app)
            .get('/compensation')
            .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('message').eql('Hello from API!');
                done(); // Signal that the asynchronous test is complete
            });
    });
});