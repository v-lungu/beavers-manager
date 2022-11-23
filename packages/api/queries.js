const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DB_URL,
});

client.connect();

const getBeavers = (request, response) => {
  client.query("SELECT * FROM beaver", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getBeavers,
};
