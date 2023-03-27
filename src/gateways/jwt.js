const { verify } = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

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
    ,publishAccessToken: (user) => {
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
                )
        }
        return result;
    }
    ,publishRefreshToken: (user) => {
        const payload = {// 페이로드 유저 정보를 담아서 보냄.
            id: user.user_id,
            phoneNumber: user.phone_number,
        }
        const result = {// payload, secretkey(사용자 임의로 생성), options
            refreshToken : jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRETKEY
                ,{
                    algorithm: 'HS256',     // 암호화 알고리즘
                    expiresIn: '30d', 	    // 유효기간
                }
            )
        }
        return result;
    },
    verify: (token) => {
        let decoded = null;
        try {
        decoded = jwt.verify(token, secret);
        return {
            ok: true,
            id: decoded.id,
            role: decoded.role,
        };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    }
}

