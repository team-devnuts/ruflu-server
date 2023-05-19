const request = require('supertest');
const config = require('../../../src/config');
const app = require('../../../index');
const logger = require('../../../src/loaders/logger');
const { pool } = require('../../../src/loaders/database');
const signController = require('../../../src/controller/sign-controller');
const jwt = require('../../../src/gateways/jwt');
const { userService } = require('../../../src/service/user-service');

// 서버 open
const server = app.listen(config.port, function(){
    logger.info('Express server listening on port ' + config.port);
}).on('error', err => {
    logger.error(err);
    process.exit(1);
}).on('close', () => {
    logger.info('close connection server');
});

beforeAll(done => {
    done();
});  

describe('jwt token', () => {
    let token;
    test('Refresh Token 발행하기', async () => {
        const user = {user_id: "1234", phone_number: "01041221498"};
        token = await jwt.publishRefreshToken(user);
        console.log(token);
    });
    
    test('Refresh Token 발행하기', async () => {
        const decode = await jwt.verify(token, config.jwtRefreshSecretKey);
        console.log(decode);
    });
});

describe('sign in test', () => {
    test('회원가입 테스트', async () => {
        const user = {phone_number: "01041221498"
                    , login_method:""
                    , nick_name:""
                    , gender:""
                    , birth:""
                    , height:""
                    , job:""
                    , fancy:""
                    , academy:""
                    }
        const result = await userService.saveUserInformation(user);
        console.log(result);
    }, 10000);
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    pool.end();
    server.close();
    done();
});