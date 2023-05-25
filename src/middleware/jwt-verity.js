const config = require("../config");
const jwt = require("../gateways/jwt");

// 토큰 검증 미들웨어
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, config.jwtAccessSecretKey);

  next();
}

module.exports = { verifyToken };
