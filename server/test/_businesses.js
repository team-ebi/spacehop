const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const { setupServer } = require("../src/server");
const db = require('knex');

function getDbConnection() {
  return db({
    client: 'postgres',
    debug: true,
    connection: {
      host: "localhost",
      database: "postgres",
      port: "5432",
      password: "",
      user: "",
    }
  });
}

const config = {
  client: 'postgres',
  // debug: true,
  connection: `postgres://${process.env.USER}@127.0.0.1:5432/spacehoptest`,
  migrations: {
    directory: './test/migrationsForTest'
  },
  seeds: {
    directory: './test/seedsForTest'
  }
};

const server = setupServer();

describe("firstendpoint", () => {
  let request;

  before( (done) =>{
    const dbConnectionBefore = getDbConnection();
    dbConnectionBefore.raw('CREATE DATABASE spacehoptest')

      .then(() => {
        return dbConnectionBefore.destroy();
      })
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  after((done) => {
    const dbConnectionAfter = getDbConnection();

    dbConnectionAfter.raw('DROP DATABASE spacehoptest')
      .then(() => {
        dbConnectionAfter.destroy()
      })
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  beforeEach((done) => {
    request = chai.request(server);
    const knexBeforeEach = require('knex')(config);

    knexBeforeEach.migrate.latest()
      .then(() => {
        return knexBeforeEach.seed.run();
      })
      .then(() => {
        return knexBeforeEach.destroy();
      })
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  afterEach((done) => {
    const knexAfterEach = require('knex')(config);
    knexAfterEach.migrate.rollback()
      .then(() => {
        knexAfterEach.destroy();
      })
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  it("businessestest", (done) => {
    request.get("/api/businesses/test")
      .then((res) => {
        const result = res.text;
        expect(result).to.equal("working");
        done();
      })
      .catch(err => done(err));
  });

  it("businessestest2", (done) => {
    request.get("/api/businesses/test")
      .then((res) => {
        const result = res.text;
        expect(result).to.equal("working");
        done();
      })
      .catch(err => done(err));
  });


  it("count1", (done) => {

    request.get("/api/businesses/data")
      .then((res) => {
        const result = res.body;
        expect(result.length).to.equal(8);
      })
      .then(() => {
        done();
      })
      .catch(err => done(err));

  });
});