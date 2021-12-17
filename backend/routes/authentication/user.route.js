const express = require('express');
const authJWT = require('../../middlewares/authJWT');

const allPeepsRouter = require('../allPeeps');
const addPeepRouter = require('../addPeep');
const singlePeepRouter = require('../singlePeep');

const router = express.Router();

router.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

// /auth/content/:contentPage
router.get(`/allPeeps`, allPeepsRouter);
router.post(`/addPeep`, [authJWT.verifyToken, authJWT.isUser], addPeepRouter);

router.post(`/singlePeep`, [authJWT.verifyToken, authJWT.isUser], singlePeepRouter);


module.exports = router;