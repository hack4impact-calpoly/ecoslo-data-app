const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userExports = require('./User');

module.exports = {
	initializeLocalStrat : (db) => {
		passport.use('local', new LocalStrategy(
			async function(username, password, done) {
				let user;
				try {
					user = await userExports.findUserByName(username, db);
					if (!user || !(await user.validPassword(password))) {
						return done(null, false, { message: 'Incorrect username or password.' });
					}
					return done(null, user);
				} catch (e) {
					return done(e);
				}
			}
		));
	},

	isAuthenticated : async (req, res, next) => {
		if (!req.user) {
			res.status(401).json({
				message : 'Unauthenticated request'
			});
		} else {
			return next();
		}
	}
};