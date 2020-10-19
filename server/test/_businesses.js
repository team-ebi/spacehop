const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const { setupServer } = require("../src/server");

const config = {
  client: 'postgresql',
  // debug: true,
  connection: {
    host : 'localhost',
    database : 'spacehoptest',
    port: "5432",
    user: "testuser",
  },
  migrations: {
    directory: './test/migrationsForTest'
  },
  seeds: {
    directory: './test/seedsForTest'
  }
};

const server = setupServer();

describe("businesses", () => {
  let request;
  const connection = require('knex')(config);

  //migrate and seed to database before each test
  beforeEach(async () => {
    request = chai.request(server);

    await connection.migrate.latest()
    await connection.seed.run();
  });

  //delete all data after each test
  afterEach(async () => {
    await connection.migrate.rollback()
  })

  //just test
  it("just test", async () => {
    const res = await request.get("/api/businesses/test")
    const result = res.text;
    expect(result).to.equal("working");
  });

  //count all businesses
  it("count", async () => {
    const res = await request.get("/api/businesses/data")
    const result = res.body;
    expect(result.length).to.equal(8);
  });
});