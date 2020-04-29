const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');
const salt = bcrypt.genSaltSync();

const UserSchema = new mongoose.Schema({
    "login": {
      "type": "String"
    },
    "password": {
      "type": "String"
    },
    "role": {
      "type": "String"
    }
  },
);

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserByPassword = async function(password, callback){
  const query = { password: password}
  await User.findOne(query, callback);
};
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.hash(candidatePassword, salt, function(err, hash){
     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
  });
};
