const { Client } = require("pg");

async function query(query) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });
  await client.connect();
  return client;
}

module.exports = {
  query,
  getNewClient,
};
