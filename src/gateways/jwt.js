const { verify } = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const ClientException = require("../exception/client-exception");

module.exports = {
    sign: (user) => {
        const payload = {// 페이로드 유저 정보를 담아서 보냄.
            id: user.user_id,
            phoneNumber: user.phone_number,
        }
        const result = {// payload, secretkey(사용자 임의로 생성), options
            accessToken : jsonwebtoken.sign(payload, process.env.JWT_SECRETKEY
                    ,{
                        algorithm: 'HS256',     // 암호화 알고리즘
                        expiresIn: '1h', 	    // 유효기간
                    }
                ),
            refreshToken : jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRETKEY
                ,{
                    algorithm: 'HS256',     // 암호화 알고리즘
                    expiresIn: '30d', 	    // 유효기간
                }
            )
        }
        return result;
    }
    ,publishAccessToken: (refreshToken) => {
        const validationResult = verify(refreshToken, config.jwtRefreshSecretKey);
        if(!validationResult.ok) new ClientException(403, "검증 되지 않은 토큰");

        const result = {// payload, secretkey(사용자 임의로 생성), options
            accessToken : jsonwebtoken.sign(payload, process.env.JWT_SECRETKEY
                    ,{
                        algorithm: 'HS256',     // 암호화 알고리즘
                        expiresIn: '1h', 	    // 유효기간
                    }
                )
        }
        return result;
    }
    ,publishRefreshToken: async (user) => {
        const payload = {// 페이로드 유저 정보를 담아서 보냄.
            userId: user.user_id,
            phoneNumber: user.phone_number,
        }
        
        const result = // payload, secretkey(사용자 임의로 생성), options
            await jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRETKEY
                ,{
                    algorithm: 'HS256',     // 암호화 알고리즘
                    expiresIn: '30d', 	    // 유효기간
                }
            )
        return result;
    },
    verify: async (token, secretkey) => {
        let decoded = null;
        try {
            decoded = await jsonwebtoken.verify(token, secretkey);

            return {
                ok: true,
                user : {userId : decoded.userId,
                        phoneNumber : decoded.phoneNumber}
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    }
}

