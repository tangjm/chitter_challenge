const express = require('express');
const Peep = require('../models/peep.model');

const router = express.Router();

router.route(`/`)
	.get((req, res) => {
		Peep.find((err, peeps) => {
			!peeps.length ? res.status(400).json({ "message": "no peeps found" }) :
				res.status(200).json(peeps);
		})
	})

module.exports = router;