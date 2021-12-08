const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Peep = require('../models/peep.model');
const server = require('../server');
const samplePeeps = require('./testData/samplePeeps.json');

chai.use(chaiHttp);
const path = '/singlePeep';

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
		// Get request for single peep
		// Peep model to query database for it's _id
		// If found, also query the database for peeps with a metaData.recipientPeepId that matches the current peep _id
		// Assemble these queried documents into an array
		// Return the single peep together with the array of peeps as a json object
		const res = await chai.request(server)
			.get(`${path}/id`)
			.send();

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
		expect(res.body.peep).to.be.an("object");
		// expect(res.body.replies).to.be.an("array");
	})

	xit(`/GET to /singlePeep/:id should return status 400 and an error message if no peep has that id`, async () => {
		await Peep.deleteMany();
		const res = await chai.request(server)
			.get(`${path}/id`)
			.send();

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid peep id");
	})
})