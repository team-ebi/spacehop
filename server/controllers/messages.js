const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require("moment");
const { returning } = require("../src/knex.js");

router.get("/:user", async (req, res) => {
  let objToSend = {};
  const email = req.params.user;
  const user = await db
    .select("*")
    .table("users")
    .where({ email });
  const user_id = user[0].id;

  const user_messages = await db
    .select("*")
    .table("messages")
    .where({ user_id });

  // Add businesses' name
  for (let i = 0; i < user_messages.length; i++) {
    const business_id = user_messages[i].business_id;

    const business = await db
      .select("*")
      .table("businesses")
      .where("id", business_id);

    user_messages[i]["business_name"] = business[0].name;
  }

  objToSend["user_messages"] = user_messages;

  const business = await db
    .select("*")
    .table("businesses")
    .where({ user_id });

  if (business.length !== 0) {
    // If business owner
    const business_id = business[0].id;

    const business_messages = await db
      .select("*")
      .table("messages")
      .where({ business_id });

    // Add businesses' name
    for (let i = 0; i < business_messages.length; i++) {
      const user_id = business_messages[i].user_id;
      const user = await db
        .select("*")
        .table("users")
        .where("id", user_id);

      business_messages[i]["user_first_name"] = user[0].first_name;
      business_messages[i]["user_last_name"] = user[0].last_name;
      business_messages[i]["email"] = user[0].email;
    }
    objToSend["business_messages"] = business_messages;
  }
  res.send(objToSend);
});

// Get all messages
router.get("/", async (req, res) => {
  const messages = await db.select("*").table("messages");
  res.send(messages);
});

//get messages by user
// router.get("/:user", async (req, res) => {
//   const email = req.params.user
//   const user = await db
//   .select("*")
//   .table("users")
//   .where({email})
//   const user_id = user[0].id
//   const messages = await db
//     .select("*")
//     .table("messages")
//     .where({ user_id });
//   res.send(messages);
// });

//get messages by biz
// router.get("/:user", async (req, res) => {
//   const business_id = req.params.biz;
//   const messages = await db
//     .select("*")
//     .table("messages")
//     .where({ biz_id });
//   res.send(messages);
// });

// Get messages by user and biz
router.get("/:user/:biz", async (req, res) => {
  const business_id = req.params.biz;
  const user_id = req.params.user;
  const messages = await db
    .select("*")
    .table("messages")
    .where({ business_id, user_id });
  res.send(messages);
});

// Update messages by user and biz
router.patch("/:user/:biz", async (req, res) => {
  const email = req.params.user;
  const user = await db
    .select("*")
    .table("users")
    .where({ email });
  const user_id = user[0].id;

  const business_id = req.params.biz;
  const updatedMessage = req.body;
  const updated = await db
    .select("*")
    .table("messages")
    .where({ business_id, user_id })
    .update({ message: JSON.stringify(updatedMessage.message) });

  // const business_id = req.params.biz;
  // const user_id = req.params.user;
  // const updatedMessage = req.body;
  // console.log(updatedMessage)
  // const updated = await db
  //   .select("*")
  //   .table("messages")
  //   .where({ business_id, user_id })
  //   .update({ message: JSON.stringify(updatedMessage) });
  res.status(200).end();
});

// Post new message to db by user id and biz id
router.post("/:user/:biz", async (req, res) => {
  const business_id = req.params.biz;
  const user_id = req.params.user;
  const newMessage = req.body;
  const check = await db
    .select("*")
    .table("messages")
    .where({ business_id, user_id });
  if (check.length === 0) {
    const newConversation = await db
      .select("*")
      .table("messages")
      .where({ business_id, user_id })
      .insert({
        business_id,
        user_id,
        message: newMessage,
      });
  }
  res.status(200).end();
});

module.exports = router;
