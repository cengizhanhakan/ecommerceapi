const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const argon2 = require('argon2');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const passport = require('passport');


module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, async (email, password, done) => {
      let userRecord = await User.findOne({
        email: email
      });
      if (!userRecord) {
        return done(null, false, {
          message: 'user does not exist'
        });
      }
      let passwordsMatched = await argon2.verify(userRecord.password, password);
      if (!passwordsMatched) {
        return done(null, false, {
          message: 'wrong password'
        })
      }
      return done(null, userRecord, {
        message: 'signed in'
      })

    }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });


  /*

  passport.use(new GoogleStrategy({
    //options for the google strategy
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/google/callback'

  }, function (accessToken, refreshToken, profile, done) {
    User.findOne({
      googleid: profile.id
    }, function (err, user) {
      if (err)
        return done(err);
      if (user)
        return done(null, user);
      else {
        var newUser = new User();
        newUser.googleid = profile.id;
        newUser.name = profile.displayName;
        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, newUser);
        })
      }
    })
  })) */
}