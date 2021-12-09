const express = require('express');
const { body, validationResult } = require('express-validator');
const { emailRegex } = require('../js/regularExpressions');
const User = require('../models/user.model');
const router = express.Router();

const validators = [
	body("name").exists().isString(),
	body("username").exists().isString(),
	body("email").exists().isString().matches(emailRegex),
	body("password").exists().isString()
];

router.route(`/`)
	.post(validators, (req, res) => {
		const errorObj = validationResult(req);

		if (!errorObj.isEmpty()) {
			return res.status(400).json({
				"message": "invalid user input",
				"error": errorObj.array()
			});
		}

		const { email, username } = req.body;
		User.findOne({ $or: [{ email }, { username }] },
			(error, user) => {
				if (user) {
					return res.status(400).json({
						"message": "invalid registration details"
					})
				}

				const newUser = new User(req.body);

				newUser.save(err => {
					if (err) {
						return res.status(400).json(err);
					}
					return res.status(200).json({
						"message": "registration successful!"
					})
				});
			});
		// POST request received containing user registration info
		// Validate user info using express-validator
		// Use Mongoose User model to instantiate a document with the received info
		// Save that document to the database collection
		// Return a res object with status 200 and a message telling the user that they registered successfully
		// If any errors occur, return status 400 and an object with an error message
		// unique username
	})

module.exports = router;