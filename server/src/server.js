const express = require("express");
const app = express();

const setupServer = () => {
    app.use(express.json());
    //Just writing one endpoint to deploy backend server.
    //Please delete it later
    app.get("/api/firstendpoint", (req, res) => {
        console.log(111111111);
        res.json({test:"test"});
    });

    return app;
};

module.exports = { setupServer };