const { expect } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http');
const sampleUsers = require('./testData/sampleUsers.json');
const invalidUsers = require('./testData/invalidLoginData.json');
const server = require('../server');
const User = require('../models/user.model');


chai.use(chaiHttp);
const testUser = {
	"email": "jared@mail.com",
	"password": "password"
}

xdescribe(`Test suite for /login route`, () => {
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

	it(`/POST to /login should return status 200 and a user object`, async () => {
		const res = await chai.request(server)
			.post(`/login`)
			.send(testUser)

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("user");
	})

	it(`/POST to /login should return status 400 and an error obj if email is invalid`, async () => {
		const res = await chai.request(server)
			.post(`/login`)
			.send(invalidUsers.nonExistentEmail);

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid email");

	})

	it(`/POST to /login should return status 400 and an error obj if password is invalid`, async () => {
		const res = await chai.request(server)
			.post(`/login`)
			.send(invalidUsers.wrongPassword);

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid password");
	})

	it(`/POST to /login should return status 400 and an error obj if email is formatted incorrectly`, async () => {
		const res = await chai.request(server)
			.post(`/login`)
			.send(invalidUsers.badEmail);

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid login details");
		expect(res.body.error).to.be.an("array");
	})
})
