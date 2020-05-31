const jwt = require('jsonwebtoken');
module.exports = {
  authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
      try {
        req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET);
        next();
      } catch {
        res.status(401).json({ message: `You not Authenticate` });
      }
    } else res.status(401).json({ message: `Login First` });
  },
};
