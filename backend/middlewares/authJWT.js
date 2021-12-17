const jwt = require("jsonwebtoken");
const config = require('../config/secret');
const db = require('../models/authentication/index');

const Role = db.role;
const User = db.user;

const verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		next();
	});
};


const isUser = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "user") {
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require user Role!" });
				return;
			}
		);
	});
};

const authJwt = {
	verifyToken,
	isUser
};

module.exports = authJwt;