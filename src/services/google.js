const passport = require('passport');
const passportGoogleStrategy = require('passport-google-oauth20');

const prepareGoogleStrategy = () => {
    const GoogleStrategy = passportGoogleStrategy.Strategy;
    const strategyName = 'google';

    passport.use(strategyName, new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
    }));
};

module.exports = prepareGoogleStrategy;