require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const cors = require('cors');
const express = require('express');

const host = process.env.HOST;
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// routes


const server = app.listen(port, host, () => {
	const serverHOST = server.address().address;
	const serverPORT = server.address().port;
	console.log(`NodeServer at: http://${serverHOST}:${serverPORT}/`);
})