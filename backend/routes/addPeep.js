const express = require('express');
const Peep = require('../models/peep.model');
const { body, validationResult } = require('express-validator');
const { isoDateRegex } = require('../js/regularExpressions');

const router = express.Router();

const validators = [
	body("message").exists().isString(),
	body("sender").exists().isObject(),
	body("sender.name").exists().isString(),
	body("sender.username").exists().isString(),
	body("date").exists().matches(isoDateRegex),
	body("metaData").exists().isObject(),
	body("metaData.isReply").exists().not().isString().isBoolean(),
	body("metaData.recipientPeepId").optional().isString()
]

router.route(`/`)
	.post(validators, (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({
				"message": "invalid peep",
				"error": error
			})
		}
		const newPeep = new Peep(req.body);
		newPeep.save()
			.then(() => {
				res.status(200).json({ "message": "successfully saved peep" });
			})
			.catch(error => {
				res.status(400).json({ "message": "error saving peep" })
			})
	})

module.exports = router;