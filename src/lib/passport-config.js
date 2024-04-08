import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

export const initializePassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        // Ваши действия с профилем пользователя
        return cb(null, profile);
      }
    )
  );
};
