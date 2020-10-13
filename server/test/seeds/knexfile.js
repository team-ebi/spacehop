require('dotenv').config();

module.exports = {
    test: {
        client: 'postgresql',
        connection: `postgres://${process.env.USER}@127.0.0.1:5432/spacehoptest`
    }
};





