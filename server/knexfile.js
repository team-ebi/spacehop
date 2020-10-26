require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: `postgres://${process.env.USER}@127.0.0.1:5432/spacehop`
  },
  production: {
    client: "postgresql",
    connection: {
      host: process.env.AWS_SPACEHOP_HOST,
      user: process.env.AWS_SPACEHOP_USER,
      password: process.env.AWS_SPACEHOP_PASSWORD,
      database: process.env.AWS_SPACEHOP_DB
    }
  },
  test: {
    client: "postgresql",
    connection: {
      host : "localhost",
      database : "spacehoptest",
      port: "5432",
      user: "testuser",
    }
  }
};
