const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync("password", 8);

const sampleUsers = [
	{
		"name": "jared",
		"username": "tangjm",
		"password": hash,
		"email": "jared@mail.com"
	},
	{
		"name": "jason",
		"username": "jason2000",
		"password": hash,
		"email": "jason@mail.com"
	},
	{
		"name": "anonymous",
		"username": "anon88",
		"password": hash,
		"email": "anon@mail.com"
	}
]

module.exports = sampleUsers;