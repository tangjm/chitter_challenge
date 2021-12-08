const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Peep = require('../models/peep.model');
const server = require('../server');
const samplePeeps = require('./testData/samplePeeps.json');

chai.use(chaiHttp);
const path = "/singlePeep";

const testId1 = "61b08a1a69be7e8ac59cc73d";
// const testId2 = "61b08a1a69be7e8ac59cc73e";
// const testId3 = "61b08a1a69be7e8ac59cc73f";

describe(`Tests for /singlePeep route`, () => {
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

	it(`/GET to /singlePeep/:id should return status 200 and an object: { peep: object, replies: array}`, async () => {

		const res = await chai.request(server)
			.get(`${path}/${testId1}`)
			.send();

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
	})

	it(`/GET to /singlePeep/:id should return status 400 and an error message if no peep has that id`, async () => {
		await Peep.deleteMany();
		const res = await chai.request(server)
			.get(`${path}/non-existentId`)
			.send();

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid peep id");
	})
})