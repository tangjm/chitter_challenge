require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');


const authRouter = require('./routes/authentication/auth.route');
const userRouter = require('./routes/authentication/user.route.js');

const Role = require('./models/role.model');

const host = process.env.HOST;
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initial = () => {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: `user`
			}).save(err => {
				if (err) {
					console.log(`error`, err);
				}
				console.log(`Added 'user' to roles collection`);
			});
		}
	});
}

initial();

// routes

app.use(`/auth`, authRouter);
app.use(`/auth/content`, userRouter);

const main = async () => {
	console.log(`Connecting to DB: ${process.env.DB_URI}`);
	await mongoose.connect(process.env.DB_URI);
}

main().catch(err => console.log(err));

const server = app.listen(port, host, () => {
	const serverHOST = server.address().address;
	const serverPORT = server.address().port;
	console.log(`NodeServer at: http://${serverHOST}:${serverPORT}/`);
})

module.exports = server;