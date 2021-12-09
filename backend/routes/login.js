const express = require('express');
const { body, validationResult } = require('express-validator');
const { emailRegex } = require('../js/regularExpressions');
const User = require('../models/user.model');
const router = express.Router();

const validators = [
	body("email").exists().isString().matches(emailRegex),
	body("password").exists().isString()
];

router.route(`/`)
	.post(validators, (req, res) => {
		const errorObj = validationResult(req);

		if (!errorObj.isEmpty()) {
			return res.status(400).json({
				"message": "invalid login details",
				"error": errorObj.array()
			})
		}

		const { email, password } = req.body;

		User.find({ email }, (error, users) => {
			if (error) {
				return res.status(400).json({
					"message": "error occured"
				})
			}

			if (!users.length) {
				return res.status(400).json({
					"message": "invalid email"
				})
			}

			if (password !== users[0].password) {
				return res.status(400).json({
					"message": "invalid password"
				})
			}

			const { name, username } = users[0];
			return res.status(200).json({ name, username });
		})
		// POST request containing user login info
		// Validate data using express-router
		// Use mongoose User model to query database for a matching email
		// If a match exists, check the password
		// If the password matches, return status 200
		// and {"name": req.body.name, "username": req.body.username}
		// If email is not found, return a json with "email not found"
		// If password doesn't match, return a json saying so
		// React should navigate to `/` once a res object is received
	})

module.exports = router;