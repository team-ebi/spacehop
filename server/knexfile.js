require("dotenv").config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://${process.env.USER}@127.0.0.1:5432/spacehop`
  },
  production: {
    // TODO
    client: 'postgresql',
    connection: process.env.AWS_CONNECTION,
    // host: process.env.AWS_HOST,
    // port: process.env.AWS_PORT,
    // user: process.env.AWS_USER,
    // password: process.env.AWS_PASSWORD,
    // database: process.env.AWS_DATABASE
  }
};
