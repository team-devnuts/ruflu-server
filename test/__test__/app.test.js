const request = require('supertest');
const app = require("../../app");
jest.setTimeout(newTimeout);

describe('Test /', () => {
    it('shoud return {state:200}', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('Test /home/userCardList', () => {
    it('shoud return UserList', async done => {
        test('유저 정보를 가지고오기', async (done) => {
            const response = await request(app)    
                .get('/api/home/userCardList');
                // .send({'user_Id' : 1});
            expect(response.status).toBe(200);
            done();

        });
    });
});