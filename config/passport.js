const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/keys');

module.exports = async (passport) => {
  const token = {}
  token.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  token.secretOrKey = config.secret;
  passport.use(new JwtStrategy(token, (jwt_payload, done) => {
    User.getUserByPassword(jwt_payload.user, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
