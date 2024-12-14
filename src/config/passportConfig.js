const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const User = require('../models/User');

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

passport.use(new OIDCStrategy({
  identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.AZURE_AD_CLIENT_ID,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  responseType: 'code',
  responseMode: 'query',
  redirectUrl: process.env.AZURE_AD_REDIRECT_URI,
  allowHttpForRedirectUrl: true,
  passReqToCallback: false,
  scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read']
}, async (iss, sub, profile, accessToken, refreshToken, done) => {
  try {
    let user = await User.findOne({ email: profile._json.preferred_username });
    if (!user) {
      user = await User.create({
        username: profile.displayName,
        email: profile._json.preferred_username,
        password: '', // No password needed for OAuth users
        role: 'student' // Default role, change as needed
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;