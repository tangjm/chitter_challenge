const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Peep = require('../models/peep.model');
const server = require('../server');
const samplePeeps = require('./testData/samplePeeps.json');
const missingPeeps = require('./testData/missingPeeps.json');
const invalidPeeps = require('./testData/invalidPeeps.json');

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

describe(`Tests for addPeep route`, () => {
	let token;
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
		const response = await chai.request(server)
			.post(`/login`)
			.send({
				email: "jared@mail.com",
				password: "password"
			})

		token = response.body.accessToken;
	})

	afterEach(() => {
		token = null;
	})

	it(`/POST to /addPeep route should return status 200 and an object with property "message": "successfully saved peep`, async () => {
		const res = await chai.request(server)
			.post(path)
			.set("x-access-token", token)
			.send(testPeep);

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "successfully saved peep");
	})

	it(`/POST to /addPeeps route should return status 400 and an error if no data is sent`, async () => {
		const res = await chai.request(server)
			.post(path)
			.set("x-access-token", token)
			.send();

		expect(res).to.have.status(400);
		expect(res.body).to.be.an("object");
		expect(res.body).to.have.property("message", "invalid peep");
	})

	describe(`Tests for missing Peeps`, () => {
		it(`/POST to /addPeeps route should return status 400 and an error if Message is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noMessage);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Sender is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noSender);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Name is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noName);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Username is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noUsername);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Date is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noDate);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if MetaData is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noMetaData);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if isReply is missing`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(missingPeeps.noIsReplyKey);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})
	})

	describe(`Tests for invalid Peeps`, () => {
		it(`/POST to /addPeeps route should return status 400 and an error if Message is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidMessage);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		xit(`/POST to /addPeeps route should return status 400 and an error if Sender is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidSender);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Name is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidName);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Username is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidUsername);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if Date is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidDate);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if MetaData is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidMetaData);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if isReply is a string`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidIsReplyKey);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if isReply is "true"`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidIsReplyKey2);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})

		it(`/POST to /addPeeps route should return status 400 and an error if RecipientPeepId is invalid`, async () => {
			const res = await chai.request(server)
				.post(path)
				.set("x-access-token", token)
				.send(invalidPeeps.invalidRecipientPeepId);

			expect(res).to.have.status(400);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("message", "invalid peep");
		})
	})
})


