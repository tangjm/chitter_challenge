require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const verifyToken = require('./middlewares/verifyJWT');
const addPeepRouter = require('./routes/addPeep');
const allPeepsRouter = require('./routes/allPeeps');
const singlePeepRouter = require('./routes/singlePeep')
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const Role = require('./models/role.model');

const host = process.env.HOST;
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

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

app.use((req, res, next) => {
	res.header(
		`Access-Control-Allow-Headers`,
		`x-access-token, Origin, Content-Type, Accept`
	);
	next();
})

app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);

app.use(`/allPeeps`, allPeepsRouter);
app.use(`/addPeep`, verifyToken, addPeepRouter);
app.use(`/singlePeep`, verifyToken, singlePeepRouter);


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