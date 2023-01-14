const request = require('supertest');
const app = require("../../app");


describe('Test /', () => {
    it('shoud return {state:200}', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});


g