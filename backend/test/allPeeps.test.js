const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Peep = require('../models/peep.model');
const server = require('../server');
const samplePeeps = require('./testData/samplePeeps.json');

chai.use(chaiHttp);

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

	test(`/GET to /allPeeps route should return status 200 and an array of peeps with the correct length`, () => {
		const res = chai.request(server)
			.get(`/allPeeps`)
			.send();

		expect(res).to.have.status(200);
		expect(res.body).to.have.length(samplePeeps.length);
		expect(res.body).to.be.an("array");
	})
})