const jwt = require('jsonwebtoken');
const { User } = require("../models/mongoose");

function authUser() {
  return (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
      const secret = process.env.SECRET;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).json({message: 'Invalid Token'});
        }
        const email = decoded.id;
        User.findOne({ email: email}, (err, user) => {
          if(!user) return res.status(403).json({message: 'Invalid Token'});
          req.body.currentUser = user;
          next();
        });
      })
    } else {
      return res.status(403).json({message: 'Forbidden route'});
    }
  }
}

module.exports = authUser;
