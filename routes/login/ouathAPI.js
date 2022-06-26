const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db_config = require('../../config/database');
let conn = null;


let url = '';
let clientId = '';
let clientSecret = '';
let redirectUrl = ''
let code = '';
let userInfoUrl = '';


router.post('/oauthAPI',function(req, res, next) {
    res.json({state:200})
    console.log(">>>>>>>>>");
});


// kakao API
class Kakao {
    constructor(code) {
        this.url = 'https://kauth.kakao.com/oauth/token';
        this.clientId = '';
        this.clientSecret = '';
        this.redirectUrl = 'http://localhost:3000/ouath/kakao';
        this.code = '';

        this.userInfoUrl = '';
        }
}

// gogle API
class google {
    constructor(code) {

    }
}


/*
[기본 형태 get]
fetch('url')
  .then((response)=>(response.json()))
  .then((data)=>console.log(data))

[기본 형태 post]
fetch('url',{
  method:"POST",
  headers : {"Content-Type" : "application/json"},
  body : JSON.stringify({
    key : value,
    key1 : value1,
    ...
  })
  }).then(response=>response.json())
  .then(data=>console.log(data))
  .catch(error=>console.log(error));
*/

// 토큰받아오기 위한 request API
const getAccessToken = async(options) => {
    try {
            return await fetch(options.url, {
                method: 'POST',
                headers: {
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify({
                    grant_type: 'authorization_code',//특정 스트링
                    client_id: options.clientID,
                    client_secret: options.clientSecret,
                    redirectUri: options.redirectUri,
                    code: options.code,
                }),
            }).then(res => res.json())
            .then(data=>console.log(data))
            .then(error=>console.log(error));
    }catch(e) {
        logger.info("error", e);
    }

}

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

router.get(`/oauth/:coperation`, async (req, res) => {

    const coperation = req.params.coperation;
    const code = req.param('code');
    const options = getOption(coperation, code);
    const token = await getAccessToken(options);
    const userInfo = await getUserInfo(options.userInfoUrl, token.access_token )

    res.send(userInfo);
}) 


router.get('/', (req, res) => {
    logger.info('GET /');
    res.sendStatus(200);
})
router.get('/error', (req,res) => {
    logger.error('Error message');
    res.sendStatus(500);
})

module.exports = router;