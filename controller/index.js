var User = require("../models/User.js");


exports.doctrl = function (req, res, next) {
	// User.find({ "email": req.session.email }, function (err, result) {
		if (!req.session.login) {
			res.redirect("/login");
		} else {
			// req.session.email
			next();
		}
	// })
};