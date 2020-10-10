const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async (req, res) => {
  res.send("working");
});

router.post("/", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;

  const register = await db
    .select("*")
    .table("users")
    .insert({
      first_name,
      last_name,
      email,
      phone
    });

  res.send("New user created!");
});

router.get("/data", async (req, res) => {
  const users = await db
    .select("*")
    .table("users");

  res.send(users);
});

//Get selected user's info 
router.get("/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    const user = await db
      .select("*")
      .table("users")
      .where({
        id
      })

    res.send(user);
  } catch {
    //If error occur, send 400 status code
    res.sendStatus(400);
  }
});

//Edit selected user's info 
router.delete("/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    await db
      .select("*")
      .table("users")
      .where({
        id
      }).del()
    res.sendStatus(200);
  } catch {
    //If error occur, send 400 status code
    res.sendStatus(400);
  }
});

module.exports = router;
