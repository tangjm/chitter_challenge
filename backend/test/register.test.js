const { expect } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http');
const sampleUsers = require('./testData/sampleUsers.json');
const invalidNewUsers = require('./testData/invalidSignUpData.json');
const server = require('../server');
const User = require('../models/user.model');


chai.use(chaiHttp);
const testNewUser = {
	"name": "testName",
	"username": "testUsername",
	"email": "test@mail.com",
	"password": "testPass",
	"roles": ["user"]
}

describe(`Test suite for /login route`, () => {
	beforeEach(async () => {
		await User.deleteMany()
			.then(() => console.log(`Emptied Collection`))
			.catch(err => {
				console.log(err);
				throw new Error();
			})
		await User.insertMany(sampleUsers)
			.then(() => console.log(`Populated Collection`))
			.catch(err => {
				console.log(err);
				throw new Error();
			})
	})

	it(`/POST to /auth/register should return status 200 and an object with a success message`, async () => {
		const res = await chai.request(server)
			.post(`/auth/register`)
			.send(testNewUser)

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "registration successful!");
	})

	it(`/POST to /auth/register should return status 400 and an error obj if email is taken`, async () => {
		const res = await chai.request(server)
			.post(`/auth/register`)
			.send(invalidNewUsers.duplicateEmail);

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid registration details");
	})

	it(`/POST to /auth/register should return status 400 and an error obj if username is taken`, async () => {
		const res = await chai.request(server)
			.post(`/auth/register`)
			.send(invalidNewUsers.duplicateUsername);

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid registration details");
	})
})
