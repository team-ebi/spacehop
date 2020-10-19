const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require("moment");

//get all messages
router.get("/", async (req, res) => {
  const messages = await db.select("*").table("messages");
  res.send(messages);
});

//get messages by user
router.get("/:user/:biz", async (req, res) => {
  const business_id = req.params.biz;
  const user_id = req.params.user;
  const messages = await db
    .select("*")
    .table("messages")
    .where({ business_id, user_id });
  res.send(messages);
});


//update messages by user and biz
router.patch("/:user/:biz", async (req, res) => {
  const business_id = req.params.biz;
  const user_id = req.params.user;
  const updatedMessage = req.body;
  const updated = await db
    .select("*")
    .table("messages")
    .where({ business_id, user_id })
    .update({ message: updatedMessage });
  res.status(200).end();
});

module.exports = router;
