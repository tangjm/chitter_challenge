const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Peep = require('../models/peep.model');
const server = require('../server');
const samplePeeps = require('./testData/samplePeeps.json');

chai.use(chaiHttp);
const path = '/addPeep';
const testPeep = {
	"message": "test message",
	"sender": {
		"name": "testName",
		"username": "testUsername"
	},
	"date": "2021-12-07T00:00:00.000Z",
	"metaData": {
		"isReply": false
	}
}

describe(`Tests for allPeeps route`, () => {
	beforeEach(async () => {
		await Peep.deleteMany()
			.then(() => console.log(`Emptied DB`))
			.catch(err => {
				console.log(err);
				throw new Error();
			})

		await Peep.insertMany(samplePeeps)
			.then(() => console.log(`Added Peeps`))
			.catch(err => {
				console.log(err);
				throw new Error();
			})
	})

	it(`/POST to /addPeep route should return status 200 and an object with property "message": "successfully saved peep`, async () => {
		const res = await chai.request(server)
			.post(path)
			.send(testPeep);

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "successfully saved peep");
	})

	xit(`/GET to /allPeeps route should return status 400 and an error message if there are no peeps`, async () => {
		await Peep.deleteMany();
		const res = await chai.request(server)
			.get(path)
			.send();

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "no peeps found");
		expect(res.body).to.have.length(samplePeeps.length);
		expect(res.body).to.be.an("array");
	})
})