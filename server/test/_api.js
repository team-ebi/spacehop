const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const { setupServer } = require("../src/server");

const server = setupServer();

//Test for deployment.
//Please delete this later.
describe("firstendpoint", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  it("firstendpoint", async () => {
    const res = await request.get("/api/firstendpoint");
    const result = JSON.parse(res.text).test;
    expect(result).to.equal("test");
  });
});