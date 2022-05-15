const passport = require('passport');
const prepareGoogleStrategy = require('./google.strategy');
const prepareLinkedinStrategy = require('./linkedin.strategy');
const prepareFacebookStrategy = require('./facebook.strategy');
const preparePaypalStrategy = require('./paypal.strategy');

const initialize = (app) => {
  passport.use(prepareGoogleStrategy());
  passport.use(prepareLinkedinStrategy());
  passport.use(prepareFacebookStrategy());
  passport.use(preparePaypalStrategy());

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = initialize;