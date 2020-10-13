const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const { setupServer } = require("../src/server");
const { migration } = require("./seeds/migration");
// const { makeSeed } = require("./seeds/seedForTest");

const server = setupServer();

//Test for deployment.
//Please delete this later.
describe("firstendpoint", () => {
  let request;
  beforeEach( () => {
    request = chai.request(server);
    console.log("^^^^^^^^^^^^^^^");
    
    new Promise((resolve,reject)=>{
      migration();
    }).then((state)=>{
      console.log(state);
    }).catch((err)=>{
      console.log(err);
    })
  });

  it("businessestest", async () => {
    const res = await request.get("/api/businesses/test");
    const result = res.text;
    expect(result).to.equal("working");
  });
});