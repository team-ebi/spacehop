const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async (req, res) => {
  res.send("working");
});

//Get each business's info
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const averageRating = await db.avg('point')
    .from('ratings')
    .where('business_id', '=', id)

  const business = await db
  .select("*")
  .table("businesses")
  .where('id', '=', id)

  //add average point to business data
  business[0]['avg']=averageRating[0]['avg']

  res.send(business[0]);
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const address_street = req.body.address_street;
  const address_city = req.body.address_city;
  const address_zip = req.body.address_zip;
  const phone = req.body.phone;
  const business_type = req.body.business_type;
  const capacity = req.body.capacity;
  const price = req.body.price;

  const register = await db
    .select("*")
    .table("businesses")
    .insert({
      name,
      address_street,
      address_city,
      address_zip,
      phone,
      business_type,
      capacity,
      price,
    });

  res.send("New business provider created!");
});

module.exports = router;
