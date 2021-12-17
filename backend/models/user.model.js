const mongoose = require('mongoose');
const { emailRegex } = require('../js/regularExpressions');

const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true, match: [emailRegex, "invalid email"] },
	password: { type: String, required: true },
	roles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}
	]
})

module.exports = mongoose.model('User', userSchema);