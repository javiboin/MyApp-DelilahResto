const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const prepareLinkedInStrategy = () => {
    const strategyName = 'linkedin';

    console.log(process.env.LINKEDIN_KEY);

    passport.use(strategyName, new LinkedInStrategy({
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: process.env.LINKEDIN_CALLBACK_URL,
        scope: ['r_emailaddress', 'r_liteprofile']
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
    }));
};

module.exports = prepareLinkedInStrategy;