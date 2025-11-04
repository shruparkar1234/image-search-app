import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: "google",
          providerId: profile.id
        });

        if (!user) {
          user = await User.create({
            provider: "google",
            providerId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: "github",
          providerId: profile.id
        });

        if (!user) {
          user = await User.create({
            provider: "github",
            providerId: profile.id,
            displayName: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
