const mongoose = require('mongoose');
const { isoDateRegex } = require('../js/regularExpressions');

const { Schema } = mongoose;

const peepSchema = new Schema({
	message: { type: String, required: true },
	sender: {
		name: { type: String, required: true },
		username: { type: String, required: true }
	},
	date: { type: Date, required: true, match: [isoDateRegex, "invalid date"] },
	peepMetaData: {
		isReply: { type: Boolean, required: true },
		recipientPeepId: { type: String }
	}
})

module.exports = mongoose.model('Peep', peepSchema);