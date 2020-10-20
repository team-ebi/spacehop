const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require("moment");

router.get("/:user", async (req, res) => {
  const email = req.params.user
  const user = await db
  .select("*")
  .table("users")
  .where({ email });
  const user_id = user[0].id;
  const messages = await db
  .select("*")
  .table("messages")
  .where({ user_id });
  const id = messages[0].business_id;
  const business = await db
  .select("*")
  .table("businesses")
  .where({ id });
  const business_name = business[0].name;
  // const parsedMessages = JSON.parse(messages[0].message);
  // for (const message of parsedMessages) {
  //   if (message.business_message) {
  //     message["business_name"] = business_name
  //   }
  // }
  // messages[0].message = JSON.stringify(parsedMessages);
  messages[0]["business_name"] = business_name;
  res.send(messages);
});

//get all messages
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

//get messages by user and biz
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
  console.log(req.body)
  const email = req.params.user
  const user = await db
  .select("*")
  .table("users")
  .where({email})
  const user_id = user[0].id
  const business_id = 1
  const updatedMessage = req.body;
  console.log(updatedMessage)
  const updated = await db
    .select("*")
    .table("messages")
    .where({ business_id, user_id })
    .update({ message: JSON.stringify(updatedMessage) });
  
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

//post new message to db by user id and biz id
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
        message: newMessage })
  }
  res.status(200).end();
});

module.exports = router;
