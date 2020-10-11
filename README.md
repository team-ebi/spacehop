<p align="center">
  <img width="150" alt="logo" src="./client/public/logo.png">
</p>

### About
Tired of working remotely in your tiny Tokyo apartment? 🏠👩🏻‍💻😫🙋🏻‍♀️

Or perhaps you're a small business owner looking for creative ways to keep the lights on? 🤔💸💡

Spacehop is our team's vision for a mobile-friendly web app that seeks to help two types of users in today's pandemic-impacted society: 
1) Small businesses that have suffered a loss in business due to the pandemic and have under-utilized spaces that can be rented out for alternative use

2) Workers who are now required to work remotely but want to get out of their house from time to time

With Spacehop, remote workers can conveniently search for places to work from for the day. These spaces can range from izakayas, concert venues, exercise studios, and more! 

The pandemic may not last forever, but remote work will be here to stay. Spacehop can help!

***

### How it works
1) Users must sign up and be logged in. You will need to verify your email before being logged in.

2) Enter your desired place, date, and time to book a space.

3) Look through the filtered list, and click on the location you'd like to work from.

4) Confirm your booking and provide payment.

5) You can manage your account info and future bookings on your Profile page.

***

### For Contributors
1) Clone this repository.
```
git clone https://github.com/team-ebi/spacehop.git
```

2) Install dependencies.
```
cd server
yarn
```
```
cd ..
cd client
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
cd ..
cd client
yarn start
```

***
### Technologies
- React
- Express Server
- Knex
- Postgres
- AWS (Amplify, EC2, Cognito)

***

### Future Features

TBD.
