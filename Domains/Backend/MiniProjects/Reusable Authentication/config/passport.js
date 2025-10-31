const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Missing Google OAuth credentials');
  process.exit(1);
}

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.error('Missing Facebook OAuth credentials');
  process.exit(1);
}

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
      async (accessToken, refreshToken, profile, done) => {
        try {          // Check if user already exists with Google ID or email
          let user = await User.findOne({
            $or: [
              { 'google.id': profile.id },
              { email: profile.emails[0].value }
            ]
          });
          
          if (user) {
            // Update Google info if not present
            if (!user.google.id) {
              user.google = {
                id: profile.id,
                email: profile.emails[0].value
              };
              await user.save();
            }
            return done(null, user);
          }
            // Create new user
          const newUser = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            google: {
              id: profile.id,
              email: profile.emails[0].value
            },
            isEmailVerified: true, // Email is verified through Google
            role: 'user' // Default role
          });
          
          done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
    },    async (accessToken, refreshToken, profile, done) => {
      try {
        // First try to find user by Facebook ID
        let user = await User.findOne({ 'facebook.id': profile.id });
        
        // If not found by Facebook ID, try finding by email
        const email = profile.emails?.[0]?.value;
        if (!user && email) {
          user = await User.findOne({ email });
        }
        
        if (user) {
          // Update Facebook info if not present
          if (!user.facebook.id) {
            user.facebook = {
              id: profile.id,
              email: email
            };
            await user.save();
          }
          return done(null, user);
        }
        
        // Create new user if doesn't exist
        if (!email) {
          return done(new Error('Email is required from Facebook'), null);
        }
        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: email
          },          email: email,
          name: profile.displayName,
          role: 'user', // Default role is user
          isEmailVerified: true, // Email is verified through Facebook
          avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
        });
        
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

module.exports = {
  passport,
  generateToken
};
