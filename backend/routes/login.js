const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

		User.findOne({ email }, (error, user) => {
			if (error) {
				return res.status(400).json({
					"message": "error occured"
				})
			}

			if (!user) {
				return res.status(400).json({
					"message": "invalid email"
				})
			}

			const passIsCorrect = bcrypt.compareSync(password, user.password);

			if (!passIsCorrect) {
				return res.status(400).json({
					"message": "invalid password"
				})
			}

			const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 });

			return res.status(200).json({ user, accessToken: token });
		})
	})

module.exports = router;