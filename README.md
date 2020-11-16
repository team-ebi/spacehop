<p align="center">
  <img width="150" alt="logo" src="./client/public/logo.png">
</p>

### About
Tired of working remotely in your tiny Tokyo apartment? 🏠 👩🏻‍💻 😫 🙋🏻‍♀️

Or perhaps you're a small business owner looking for creative ways to keep the lights on? 🤔 💸 💡

Spacehop is our team's vision for a progressive web app that seeks to help two types of users in today's pandemic-impacted society: 
1) Small businesses that have suffered a loss in business due to the pandemic and have under-utilized spaces that can be rented out for alternative use

2) Workers who are now required to work remotely but want to get out of their house from time to time

With Spacehop, remote workers can conveniently search for places to work from for the day. These spaces can range from izakayas, concert venues, exercise studios, and more! 

The pandemic may not last forever, but remote work will be here to stay. Spacehop can help!

***
### Demo

User searching for a space:<br>
<img width="250" alt="logo" src="./client/public/DEMO_search.gif">

Results offered in list and map views, then user can click on a space for more details and to book:<br>
<img width="250" alt="logo" src="./client/public/DEMO_results.gif">

User profiles allow users to edit their info, look at upcoming and past bookings, and leave a rating and review:<br>
<img width="250" alt="logo" src="./client/public/DEMO_profile.gif">

Users can send a message to business owners and find more info in the main menu (like our team page!):<br>
<img width="250" alt="logo" src="./client/public/DEMO_chat.gif">

Businesses owners can register their business details by clicking on Business Profile from the main menu:<br>
<img width="250" alt="logo" src="./client/public/DEMO_addbusiness.gif">

Once registered, business owners can manage their profile and availability from the business profile page:<br>
<img width="250" alt="logo" src="./client/public/DEMO_businessprofile.gif">

Business owners will have a switch in their inbox allowing them to toggle between user messages and business messages:<br>
  <img width="250" alt="logo" src="./client/public/DEMO_businessinbox.gif">

***

### How it works
1) Users must sign up and be logged in. You will need to verify your email before logging in.

2) Enter your desired place, date, and time to book a space.

3) Look through the filtered list, and click on the location you'd like to work from. Right now, sample data is provided for the following parameters: Shibuya, Mondays, anytime between 12pm - 5pm.

4) Confirm your booking and provide payment.

5) You can manage your account info and future bookings on your Profile page.

6) You can message business owners whose spaces you have booked. 

7) If you are a business owner, you can register your business on the Business Profile page, and you can toggle between User and Business messages in your inbox.

Please note:
Our styles are prioritized to work best on an Iphone X. 

***

### For Contributors
1) Fork and clone this repository.

2) Install dependencies.
```
cd server
yarn
```
```
cd ../client
yarn
cd ..
```
3) Create local database
```
psql
CREATE DATABASE spacehop;
```
4) Run migrations and seed.
```
cd server
yarn migrate
yarn seed
```
5) Start backend and frontend server.
```
yarn start
cd ../client
yarn start
```

***
### Technologies
- React
- Node/Express
- Knex
- Postgres
- AWS (Amplify, Elastic Beanstalk, Cognito, S3, RDS)
- CircleCI
- Google Maps API
- Stripe Checkout API

***

### Future Features

- Re-route payments for customers to businesses using Stripe API Connect
- Include other alternative uses for space rentals (e.g. meetups, art classes, exericse classes)
- Add filters for amenities
- Share location feature to coordinate with friends

***


