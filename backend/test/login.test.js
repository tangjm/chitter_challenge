const { expect } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http');
const sampleUsers = require('./testData/sampleUsers.json');
const server = require('../server');
const User = require('../models/user.model');


chai.use(chaiHttp);
const testUser = {
	"email": "jared@mail.com",
	"password": "password"
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

	it(`/POST to /login should return status 200 and an object with 2 keys: name and username`, async () => {
		const res = await chai.request(server)
			.post(`/login`)
			.send(testUser)

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("name", "jared");
		expect(res.body).to.have.property("username", "tangjm");
	})
})