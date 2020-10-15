const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const { setupServer } = require("../src/server");
const db =require('knex');

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
  connection:  `postgres://${process.env.USER}@127.0.0.1:5432/spacehoptest`,
  migrations: {
    directory: './test/migrationsForTest'
  },
  seeds: {
    directory: './test/seedsForTest'
  }
};
const knex = require('knex')(config);

const server = setupServer();

//Test for deployment.
//Please delete this later.
describe("firstendpoint", () => {
  let request;

  before(async () => {
    const dbConnection1 = getDbConnection();

    try {
      await dbConnection1.raw('DROP DATABASE IF EXISTS spacehoptest');
      await dbConnection1.raw('CREATE DATABASE spacehoptest');

    } catch (err) {
      console.log(err);
    } 
    finally {
      await dbConnection1.destroy();
    }
  });

  after(async () => {
    const dbConnection2 = getDbConnection();
    try {
      await dbConnection2.raw('DROP DATABASE spacehoptest');
      await dbConnection2.destroy();

    } catch (err) {
      console.log(err);
    } 
    finally {
      await dbConnection2.destroy();
    }
  });

  beforeEach(async () => {
    request = chai.request(server);
    try {
       await knex.migrate.latest()
      //  .then(()=>{
          await knex.seed.run();
      //  })
    } catch (err) {
      console.log(err);
    } 
    finally {
      await knex.destroy();
    }
  });

  afterEach(async () => {
    try {
      await knex.migrate.rollback()
      // await knex.destroy();
    } 
    catch (err) {
      console.log(err);
    } 
    finally {
      await knex.destroy();
    }
  });

  it("businessestest", async () => {
    const res = await request.get("/api/businesses/test");
    const result = res.text;
    expect(result).to.equal("working");
  });

  it("count", async () => {
    const res = await request.get("/api/businesses/data");
    const result = res.body;
    // console.log(res);
    expect(result.length).to.equal(7);
  });
});