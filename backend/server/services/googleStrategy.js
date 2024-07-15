const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('../models/userInfoModel');
const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Access Token:", accessToken);
    console.log("Profile:", profile);

    try {
      const email = profile.emails && profile.emails[0].value;
      if (!email) {
        return done(new Error('No email found in profile'), null);
      }

      const oldUser = await User.findOne({ email: email });

      if (oldUser) {
        return done(null, oldUser);
      }

      const newUser = new User({
        provider: 'google',
        googleId: profile.id,
        email: email,
        name: profile.displayName,
        photo: profile.photos && profile.photos[0].value,
      });

      await newUser.save();
      done(null, newUser);
    } catch (err) {
      console.error('Error during Google OAuth:', err);
      done(err, null);
    }
  },
);

passport.use(googleLogin);

// Add serialization and deserialization functions for Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
