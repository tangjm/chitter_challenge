const mongoose = require('mongoose');
const { isoDateRegex } = require('../js/regularExpressions');

const { Schema } = mongoose;

const peepSchema = new Schema({
	// maybe add an id later?
	message: { type: String, required: true },
	sender: {
		name: { type: String, required: true },
		username: { type: String, required: true }
	},
	date: { type: Date, required: true, match: [isoDateRegex, "invalid date"] },
	metaData: {
		isReply: { type: Boolean, required: true },
		recipientPeepId: { type: String }
	}
})

const Peep = mongoose.model('Peep', peepSchema);

module.exports = Peep;