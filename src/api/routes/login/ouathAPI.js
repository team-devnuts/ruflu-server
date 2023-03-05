const express = require("express");
const router = express.Router();
const {smsAPI} = require("./smsAPI");
const logger = require("../../../loaders/logger");


module.exports = (app) => {
    app.use('/login', router);

    router.post('/oauthAPI', async (req, res) => {
        res.json({state:200});
    });
    
    router.get('/', (req, res) => {
        logger.info('GET /');
        res.sendStatus(200);
    });
    router.get('/error', (req,res) => {
        logger.error('Error message');
        res.sendStatus(500);
    });

    router.post('/sms', async (req, res) => {
        res.json(await smsAPI.send_message(req, res));
    });
}




/*

// kakao APIzv
class Kakao {
    constructor(code) {
        // this.url = 'https://kauth.kakao.com/oauth/token';
        // this.clientID = '{발급받은 REST API}';
        // this.clientSecret = '{보안안에 있는 SecretCode}';
        // this.redirectUri = 'http://localhost:8081/oauth/kakao';
        // this.code = code;

        // userInfo
        //this.userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        this.url = 'https://kauth.kakao.com/oauth/token';
        this.clientId = '0f98d59fa72de0c4491bbc3cd208a4d7';
        this.clientSecret = '';
        this.redirectUrl = 'http://localhost:3000/ouath/kakao';
        this.code = 'kakao';
        }
}

// gogle API
class google {
    constructor(code) {

    }
}

// 토큰 받아오기 위한 request API
const getAccessToken = async(options) => {
    try {
            return await fetch(options.url, {
                method: 'POST',
                headers: {
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify({
                    grant_type: 'authorization_code',
                    client_id: options.clientID,
                    client_secret: options.clientSecret,
                    redirectUri: options.redirectUri,
                    code: options.code,
                }),
            }).then(res => res.json())
            .then(data => console.log(data))
            .then(error => console.log(error));
    }catch(e) {
        logger.info("error", "---------------------- getAccessToken / " + e);
    }

}

// redirectURL 온 
const getUserInfo = async (url, access_token) => {
    try {
        return await fetch(url, {
            method : 'POST',
            headers : {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${access_token}`
            }
        }).then(res => res.json());
    }catch(e) {
    }
}

const getOption = (coperation, code) => {
    switch(coperation) {
        case 'kakao' :
            return new Kakao(code);
        break;

        case 'google' :
            // return new Google(code);
        break;
    }
}

// router.get(`/oauth/:coperation`, async (req, res) => {
//     const coperation = req.params.coperation
//     //const code = req.param('code')
//     const options = getOption(coperation, 'kakao')
//     const token = await getAccessToken(options)
//     const userInfo = await getUserInfo(options.userInfoUrl, token.access_token)

//     res.send(userInfo);
// })
*/
