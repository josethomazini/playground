const { Client } = require("pg");

async function query(query) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  });
  await client.connect();
  const result = await client.query(query);
  await client.end();
  return result;
}

module.exports = {
  query,
};
