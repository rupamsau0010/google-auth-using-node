// Require depandencies...
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const express = require("express");

const app = express();

module.exports = function (passport, req, res) { // Importing the passport module before exporting to the app.js...
  
  // Use of SerializerUser and DeserializerUser...
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // Creating the new user docs in json format...  
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          // Seeing the user already there in the DB or not...  
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // If user is already in the Database...  
            done(null, user);
          } else {
            // If user is not in the Database (new user)...  
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
