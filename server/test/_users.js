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
    host: 'localhost',
    database: 'spacehoptest',
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

describe("users", () => {
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
    const res = await request.get("/api/users/test");
    const result = res.text;
    expect(result).to.equal("working");
  });

  //count all users
  it("count", async () => {
    const res = await request.get("/api/users/data");
    const result = res.body;
    expect(result.length).to.equal(30);
  });

  //resister user
  it("count", async () => {

    const first_name = "taro";
    const last_name = "test";
    const email = "test@test.com";
    const phone = "1234567890";

    const data = {
      first_name,
      last_name,
      email,
      phone
    }
    await request.post("/api/users").send(data);
    const users = await connection.select("*").table("users");
    expect(users.length).to.equal(31);

    const addedUser = await connection.select("*").table("users").where({ first_name, last_name, email, phone });
    expect(addedUser.length).to.equal(1);
  });

  // // Check if user has business account by email
  // it("count", async () => {
  //   const res = await request.post("/api/users/account").send({email:"aiko@mochizuki.com"});
  //   const availabilities=res.body[0].availabilities;
  //   //Monday only
  //   expect(availabilities.length).to.equal(1);
  //   expect(availabilities[0].day).to.equal("Monday");
  //   expect(availabilities[0].start_hour).to.equal(12);
  //   expect(availabilities[0].end_hour).to.equal(17);
    
  //   const reservations=res.body[0].reservations;
  //   //Have one reservation
  //   expect(reservations.length).to.equal(6);
  //   expect(reservations[0].date).to.equal("2020-11-02")
  //   expect(reservations[0].price).to.equal(20000);
  //   expect(reservations[0].created_at).to.equal("2020-10-01");
  //   expect(reservations[0].business_id).to.equal(1);
  //   expect(reservations[0].user_id).to.equal(1);
  // });
});