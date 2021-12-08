const express = require('express');
const Peep = require('../models/peep.model');

const router = express.Router();

router.route(`/:id`)
	.get((req, res) => {
		let id = req.params.id;
		req.app.locals.peepId = id;

		Peep.findById(id, (error, peep) => {
			if (error) {
				return res.status(400).json({
					"message": "invalid peep id"
				});
			}
			return res.status(200).json(peep);
		})

		// Peep.find({ "metaData.recipientPeepId": id })
		// 	.then(peeps => {
		// 		console.log(peeps)
		// 		req.app.locals.relatedPeeps = peeps;
		// 	})
		// 	.catch(err => {
		// 		return res.status(400).json({
		// 			"message": "invalid peep id"
		// 		})
		// 	})

		// let currentPeep = req.app.locals.currentPeep;
		// let relatedPeeps = req.app.locals.relatedPeeps;
		// console.log(currentPeep);
		// console.log(relatedPeeps);
		// return res.status(200).json({
		// 	"peep": currentPeep,
		// 	"replies": relatedPeeps
		// })
	});


module.exports = router;

// Get request for single peep
		// Peep model to query database for it's _id
		// If found, also query the database for peeps with a metaData.recipientPeepId that matches the current peep _id
		// Assemble these queried documents into an array
		// Return the single peep together with the array of peeps as a json object