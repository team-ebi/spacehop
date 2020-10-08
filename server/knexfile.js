module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://${process.env.USER}@127.0.0.1:5432/spacehop`
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
