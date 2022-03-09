const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const formElement = document.getElementById("saveLogin");

passport.use(new FacebookStrategy({
    clientID: secret_config.federation.facebook.client_id,
    clientSecret: secret_config.federation.facebook.secret_id,
    callbackURL: secret_config.federation.facebook.callback_url,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone',
      'updated_time', 'verified', 'displayName']
  }, function (accessToken, refreshToken, profile, done) {
    const _profile = profile._json;
    
    console.log('Facebook login info');
    console.info(_profile);
    
    loginByThirdparty({
      'auth_type': 'facebook',
      'auth_id': _profile.id,
      'auth_name': _profile.name,
      'auth_email': _profile.id
    }, done);
  }
));
// ---------------------------  HASTA ACA COPIADO Y FALTA LA PRUEBA

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;

    user = "hola1";
    password = "hola2";

    let transaction = {
        user: user,
        password: password
    };

    let transactionJson = JSON.stringify(transaction);

    // MANDAR LOS DATOS DEL BACKEND Y GUARDARLOS AHI
    console.log(transaction);
    console.log(transactionJson);

    fetch('https://www.delilah-resto.ga/api/login', {
        method : 'POST',
        body   : transactionJson,
        headers : {
          'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    });