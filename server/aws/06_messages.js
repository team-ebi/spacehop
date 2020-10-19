const knex = require("./config.js");

const messages = () => {
  const sample = [
    { user_message: "Hello, do you have wi-fi at the izakaya?" },
    { business_message: "Yes, we have unlimited wi-fi" },
    { user_message: "Sounds good! Thank you for responding." },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Oh, okay thank you. I will see you soon!" },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you son." },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." },
    { business_message: "Okay, sounds great. See you later." }
  ]
  const strigify = JSON.stringify(sample);

  knex("messages").del().then(() => {
    return knex("messages").insert([
      { user_id: 1, business_id: 1, message: strigify}
    ])
    .then(() => process.exit());
  });
}

module.exports = { messages };
