require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');

const host = process.env.HOST;
const port = process.env.PORT;
const app = express();

const server = app.listen(port, host, () => {
	const serverHOST = server.address().address;
	const serverPORT = server.address().port;
	console.log(`NodeServer at: http://${serverHOST}:${serverPORT}/`);
})