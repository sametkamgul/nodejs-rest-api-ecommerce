const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.query.token || req.headers.authorization;

  try {
    const sessionTokenResult = jwt.verify(token, process.env.TOKEN_SECRET);

    req.session = sessionTokenResult;
    req.session.token = token;

    next();
  } catch (error) {
    return res.json({ error: "invalid token" });
  }
};

module.exports = authentication;
