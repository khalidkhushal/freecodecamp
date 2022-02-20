const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// client credentials
const GOOGLE_CLIENT_ID = "410679182658-9crjsrl1d46g5mbl89m5o9f490to8uip.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


const strategy = new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/callback",
        passReqToCallback: true
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //
        return done(err, profile);
    });


passport.use(strategy);
passport.serializeUser(function(user, done) {
    return done(null, user);
});
passport.deserializeUser(function(user, done) {
    return done(null, user);
});