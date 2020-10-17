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

describe("firstendpoint", () => {
  let request;
  const connection = require('knex')(config);

  beforeEach(async () => {
    request = chai.request(server);

    await connection.migrate.latest()
    await connection.seed.run();
  });

  afterEach(async () => {
    await connection.migrate.rollback()
  })

  it("just test", async () => {
    const res = await request.get("/api/businesses/test")
    const result = res.text;
    expect(result).to.equal("working");
  });

  it("count", async () => {
    const res = await request.get("/api/businesses/data")
    const result = res.body;
    expect(result.length).to.equal(8);
  });
});