require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const addPeepRouter = require('./routes/addPeep');
const allPeepsRouter = require('./routes/allPeeps');
const singlePeepRouter = require('./routes/singlePeep')
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const host = process.env.HOST;
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// routes

app.use(`/allPeeps`, allPeepsRouter);
app.use(`/addPeep`, addPeepRouter);
app.use(`/singlePeep`, singlePeepRouter);
app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);

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