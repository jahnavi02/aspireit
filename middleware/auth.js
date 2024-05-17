// middleware/auth.js
const passport = require('passport');

module.exports.ensureAuth = passport.authenticate('jwt', { session: false });
