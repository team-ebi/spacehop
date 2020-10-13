const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async (req, res) => {
  res.send("working");
});

//Get selected business's ratings
router.get("/:business_id", async (req, res) => {
  const business_id = req.params.business_id;

  try {
    const ratings = await db.select("*").table("ratings").where({
      business_id,
    });
    res.send(ratings);
  } catch {
    res.sendStatus(500);
  }
});

//Post selected business's rating
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await db.select("*").table("users").where({
      email,
    });

    const user_id = user[0]["id"];
    const business_id = req.body.business_id;
    const point = req.body.point; //point is not null(1,2,3,4,5)
    const comment = req.body.comment;

    const ratings = await db.select("*").table("ratings").insert({
      business_id,
      user_id,
      point,
      comment,
    });
    res.send(ratings);
  } catch (err) {
    console.log("ERROR posting rating BE: ", err);
  }
});

//Get selected business's rating by user
router.get("/:business_id/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const user = await db.select("*").table("users").where("email", email);
    
    const user_id = user[0]["id"];
    const business_id = req.params.business_id;

    const rating = await db.select("*").table("ratings").where({
      business_id,
      user_id,
    });
    res.send(rating);
  } catch (err) {
    console.log("ERROR fetching rating BE: ", err);
  }
});

module.exports = router;
