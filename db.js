const Pool = require('pg').Pool;

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// };

// const prodConfig = {
//   connectionString: process.env.DATABASE_URL, // heroku addons
// };

// const pool = new Pool(
//   process.env.NODE_ENV === 'production' ? prodConfig : devConfig
// );

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prodConfig = process.env.DATABASE_URL; // heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
});

module.exports = pool;
