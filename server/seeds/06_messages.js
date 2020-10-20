exports.seed = function(knex) {
  const sample = [
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
    { user_message: "Hello, do you have wi-fi at the izakaya?" }
  ]

  const sample2 = [
    { user_message: "Can I reschedule my booking?" },
    { business_message: "Yes, we have unlimited wi-fi" },
    { user_message: "Sounds good! Thank you for responding." },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Oh, okay thank you. I will see you soon!" },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you son." },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." }
  ]

  const sample3 = [
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
    { business_message: "Okay, sounds great. See you later." },
    { user_message: "What time do you usually open?" }
  ]

  const sample4 = [
    { business_message: "Yes, we have unlimited wi-fi" },
    { user_message: "Sounds good! Thank you for responding." },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you son." },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." },
    { business_message: "Okay, sounds great. See you later." },
    { user_message: "Do you have many electrical outlets at the cafe?" },
    { user_message: "Oh, okay thank you. I will see you soon!" }
  ]

  const sample5 = [
    { user_message: "Thank you very much for keeping your cafe so clean!" },
    { business_message: "Yes, we have unlimited wi-fi" },
    { user_message: "Sounds good! Thank you for responding." },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Oh, okay thank you. I will see you soon!" },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." },
    { business_message: "Okay, sounds great. See you later." },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you soon." }
  ]

  const sample6 = [
    { user_message: "Hello, I think I left my wallet at your izakaya." },
    { business_message: "Yes, we have unlimited wi-fi" },
    { user_message: "Sounds good! Thank you for responding." },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Oh, okay thank you. I will see you soon!" },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you son." },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." },
    { business_message: "Okay, sounds great. See you later." },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" }
  ]

  const sample7 = [
    { user_message: "What time does your cafe close?" },
    { business_message: "Yes, we have unlimited wi-fi" },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Oh, okay thank you. I will see you soon!" },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you son." },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." },
    { business_message: "Okay, sounds great. See you later." },
    { user_message: "Sounds good! Thank you for responding." }
  ]

  const sample8 = [
    { user_message: "Hi, I will be late to my reservation. I am sorry!" },
    { user_message: "Sounds good! Thank you for responding." },
    { user_message: "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?" },
    { business_message: "No problem! Yes we have many easily accessible outlets here and also have extension cords." },
    { user_message: "Oh, okay thank you. I will see you soon!" },
    { user_message: "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?" },
    { business_message: "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you son." },
    { user_message: "Thank you so much." },
    { business_message : "We have found your laptop charger! Would you like us to send it to you?" },
    { user_message: "Oh great! Thank you so much. I can come pick it up later today. Thank you again." },
    { business_message: "Okay, sounds great. See you later." },
    { business_message: "Yes, we have unlimited wi-fi" }
  ]

  const stringify = JSON.stringify(sample);
  const stringify2 = JSON.stringify(sample2);
  const stringify3 = JSON.stringify(sample3);
  const stringify4 = JSON.stringify(sample4);
  const stringify5 = JSON.stringify(sample5);
  const stringify6 = JSON.stringify(sample6);
  const stringify7 = JSON.stringify(sample7);
  const stringify8 = JSON.stringify(sample8);


  return knex("messages").del().then(function () {
    return knex("messages").insert([
      { user_id: 1, business_id: 1, message: stringify},
      { user_id: 1, business_id: 2, message: stringify2},
      { user_id: 1, business_id: 3, message: stringify3},
      { user_id: 1, business_id: 4, message: stringify4},
      { user_id: 1, business_id: 5, message: stringify5},
      { user_id: 1, business_id: 6, message: stringify6},
      { user_id: 1, business_id: 7, message: stringify7},
      { user_id: 1, business_id: 8, message: stringify8}
    ]);
  });
};
