const axios = require('axios');
// create signature2
const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

const send_message = async (req, res) => { 
    const smsAuthCode = Math.floor(1000 + Math.random() * 9000);
    const userPhoneNumber = req.body.phone_number;
    const {url, headers, body} = getSmsRequestData(userPhoneNumber, smsAuthCode);

    req.responseObject.result.smsAuthCode = smsAuthCode;
    req.responseObject.result.resultCode = await requestSmsApiService(url, headers, body);
    return req.responseObject;
}

const requestSmsApiService = async (url, headers, body) => {
    let resultCode = 404;
    await axios.create({ headers: headers })
        .post(url, body)
        .then(response => {
            resultCode = response.data.statusCode;
            console.log(response);
            //return {smsAuthCode, resultCode};
        })
        .catch(error => {
            console.log(error);
            //console.log(error.status);
            //return {smsAuthCode, resultCode};
            resultCode = error;
        });
    return resultCode;
}

const getSmsRequestData = (userPhoneNumber, smsAuthCode) => {
    const { url, accessKey, date, signature } = getHeadersSmsApi();

    return {
        url: url,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature
        },
        body: {
            type: "SMS",
            countryCode: "82",
            from: "01041221498",
            content: `인증번호는 [${smsAuthCode}] 입니다.`,
            messages: [{ to: `${userPhoneNumber}`, }
            ],
        }
    };
}


const getHeadersSmsApi = () => {
    const date = Date.now().toString();
    const method = "POST";
    const serviceId = process.env.SENS_SERVICEID;
    const accessKey = process.env.SENS_ACCESSKEY;
    const secretKey = process.env.SENS_SECRETKEY;
    const space = " ";
    const newLine = "\n";
    // https://sens.apigw.ntruss.com/sms/v2
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;
    
    // singature를 생성하기 위한 암호화 SHA256
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    return { url, accessKey, date, signature };
}

exports.smsAPI = {send_message};

