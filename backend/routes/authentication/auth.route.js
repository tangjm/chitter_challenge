const express = require('express');
const { signup, signin } = require('../../controllers/auth.controller');
const router = express.Router();

router.use((req, res, next) => {
	res.header(
		`Access-Control-Allow-Headers`,
		`x-access-token, Origin, Content-Type, Accept`
	);
	next();
});

// /auth/register
router.post(`/register`, signup);

// /auth/login
router.post(`/login`, signin);

module.exports = router;