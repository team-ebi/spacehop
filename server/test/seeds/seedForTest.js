
const makeSeed = async () => {
    const db = require("./knex");
    const users = require("./data/users")
    const businesses = require("./data/businesses")
    const availability = require("./data/availability")
    const ratings = require("./data/ratings")
    const reservations = require("./data/reservations")
    console.log("wwwwwwwwww");

    db.select("*").table("users").insert(users)
    .then(()=>{
        return db.select("*").table("businesses").insert(businesses)
    })
    .then(()=>{
        return db.select("*").table("availability").insert(availability)
    })
    .then(()=>{
        return db.select("*").table("ratings").insert(ratings)
    })
    .then(()=>{
        return db.select("*").table("reservations").insert(reservations)
    })
    
}

makeSeed();

module.exports = { makeSeed };