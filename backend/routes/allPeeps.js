const express = require('express');
const Peep = require('../models/peep.model');
const router = express.Router();

router.route(`/`)
	.get((req, res) => {
		// get request to retrieve all stored peeps in database
		// Use Peep model to query database's peeps collection for all peeps
		// Then send back the peeps as a json object
		Peep.find()
	})