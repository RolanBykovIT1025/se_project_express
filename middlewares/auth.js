const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const auth = (req, res, next) => {
  // Extract token from Authorization header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    req.user = payload; // This sets req.user with real data
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }
};

module.exports = auth;