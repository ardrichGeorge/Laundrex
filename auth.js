const jwt = require('jsonwebtoken');
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
module.exports = authenticate;
