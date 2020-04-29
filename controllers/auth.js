const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');


module.exports = {
  authUser: async (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  const user = await User.findOne({ login });

  if(!user){
    return res.json({status: "fail", message: 'User not found'});
  }
  User.comparePassword(password, user.password, (err, isMatch) => {
    if(err) throw err;
    if(password == user.password){
      const token = jwt.sign({user: password}, config.secret, {expiresIn: '1h' });
      res.json({ status: "success",  message:"User found!",
      data:{user: user, token: 'JWT '+ token}
      });
    } else{
      return res.json({status: "fail", message: 'Invalid password!'});
    }
  });
},
profileUser: async (req, res, next) => {
  res.json({message: `${req.user.login}, authorized successfully!`})
}

}
