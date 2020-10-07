module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://${process.env.USER}@127.0.0.1:5432/test_ebi`
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
