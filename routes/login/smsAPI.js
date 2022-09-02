var express = require('express')
var http = require('http') // 별도 설치 없이 사용 가능
var bodyParser = require('body-parser')
var mysql = require('mysql')
var crypto = require('crypto')
var request = require('request') //2020년 2월 11일 이후로 deprecated 됨

// create signature2
var CryptoJS = require('crypto-js')
var SHA256 = require('crypto-js/sha256')
var Base64 = require('crypto-js/enc-base64')

router.post('/smsAPI', async (req, res) => {
    res.json({state:200})
    
});

function send_message(phone) { 
    var userPhoneNumber = phone
    var userAuthNumber = Math.floor(100000 + Math.random() * 900000)
    var resultCode = 404

    const date = Data.now().toString()
    const uri = process.env.SENS_serviceId
    const secretKey = process.env.SENS_secretKey
    const accessKey = process.env.SENS_accessKey
    const method = 'POST'
    const space = " "
    const newLine = "\n"
	const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`
	const url2 = `/sms/v2/services/${uri}/messages`


    const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey)
	hmac.update(method);
	hmac.update(space);
	hmac.update(url2);
	hmac.update(newLine);
	hmac.update(date);
	hmac.update(newLine);
	hmac.update(accessKey);

	const hash = hmac.finalize();
	const signature = hash.toString(CryptoJS.enc.Base64);

    request(
        {
            method : method,
            join : true,
            uri : url,
            headers : {
                "Contenc-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": accessKey,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature,
            },
            body: {
                type: "SMS",
                countryCode: "82",
                from: "01033199297",
                content: `인증번호는 ${userAuthNumber} 입니다.`,
                messages: [
                    {
                      to: `${userPhoneNumber}`,
                    },
                ],
            },

            function (err, res, html) {
                if (err) console.log(err)
                else {
                    resultCode = 200
                    console.log(html)
                }
            }
        }
    )
    return resultCode
}