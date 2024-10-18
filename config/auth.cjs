// constructor for creating a jwt strategy
const JwtStrategy = require("passport-jwt").Strategy;
// helper method for extracting the token from auth header
const ExtractJwt = require("passport-jwt").ExtractJwt;
// importing User module
const User = require("../models/User.cjs");

// method that will be used to verify incoming request with jwt token
module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_TOKEN;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ email: jwt_payload.email })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
