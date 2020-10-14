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

// Edit user info by email
router.patch("/", async (req, res) => {
  const email = req.body.email;
  const updateInfo = req.body;

  const update = await db
  .select("*")
  .returning("*")
  .table("users")
  .where({ email })
  .update(updateInfo);

  res.send(update);
});

// Delete user info by email
router.delete("/", async (req, res) => {
  const email = req.body.email;

  await db
  .select("*")
  .table("users")
  .where({ email })
  .del();

  res.send("Delete user success");
});

module.exports = router;
