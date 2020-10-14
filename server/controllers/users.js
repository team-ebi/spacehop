const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async (req, res) => {
  res.send("working");
});

//creating new user
router.post("/", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;

  try {
    const register = await db.select("*").table("users").insert({
      first_name,
      last_name,
      email,
      phone,
    });

    res.send("New user created!");
  } catch {
    //If error occur, send 500 status code
    res.sendStatus(500);
  }
});

//Get all users
router.get("/data", async (req, res) => {
  try {
    const users = await db.select("*").table("users");

    res.send(users);
  } catch {
    //If error occur, send 500 status code
    res.sendStatus(500);
  }
});

// Check if user has business account by email
// If business acccount, send joined business, user and reservation table
// If not send empty array
router.get("/account", async (req, res) => {
  const email = req.body.email;
  
  // Get user id by email
  const user = await db
    .select("*")
    .table("users")
    .returning("id")
    .where({ email });
  const user_id = user[0]["id"];

  // Find if user has business account
  const business = await db
    .select("*")
    .table("businesses")
    .returning("id")
    .where({ user_id }, (res) => {
      console.log(res);
      // res ?
      // console.log(true) :
      // console.log(false)
    });

  res.send("not business");
});

//Get selected user's info
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await db.select("*").table("users").where("email", email);
    console.log(user)
    res.send(user);
  } catch {
    //If error occur, send 500 status code
    res.sendStatus(500);
  }
});

//Edit selected user's info
router.patch("/:user_id", async (req, res) => {
  const id = req.params.user_id;

  //object to store column to change
  let columnToChange = {};

  if (req.body.first_name) columnToChange["first_name"] = req.body.first_name;
  if (req.body.last_name) columnToChange["last_name"] = req.body.last_name;
  if (req.body.email) columnToChange["email"] = req.body.email;
  if (req.body.phone) columnToChange["phone"] = req.body.phone;

  try {
    const user = await db
      .select("*")
      .table("users")
      .where({
        id,
      })
      .update(columnToChange);
    res.send("Update succeeded");
  } catch {
    //If error occur, send 500 status code
    res.sendStatus(500);
  }
});

//Delete selected user's info
router.delete("/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    await db
      .table("users")
      .where({
        id,
      })
      .del();
    res.send("Delete succeeded");
  } catch {
    //If error occur, send 500 status code
    res.sendStatus(500);
  }
});

module.exports = router;
