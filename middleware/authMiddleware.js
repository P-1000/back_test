const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/User");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: proccess.env.SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userId);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport.authenticate("jwt", { session: false });
