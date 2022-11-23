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

const getGuardian = (request, response) => {
  client.query("SELECT * FROM guardian", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
};

const createGuardianSQL =
  "INSERT INTO guardian(email, name, phone_number) values ($1, $2, $3);";
const createBeaverSQL =
  "INSERT INTO beaver (name, email, grade) values ($1, $2, $3);";

const createBeaver = (request, response) => {
  const { name, email, grade, phone, guardianName } = request.body;

  client.query(
    createGuardianSQL,
    [email, guardianName, phone],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );

  client.query(createBeaverSQL, [name, email, grade], (error, results) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = {
  getBeavers,
  createBeaver,
  getGuardian,
};
