const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DB_URL,
});

client.connect();

const getBeavers = (request, response) => {
  const columns = request?.query?.columns ?? "*";
  client.query(`SELECT ${columns} FROM beaver`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getGuardian = (request, response) => {
  const columns = request?.query?.columns ?? "*";
  client.query(`SELECT ${columns} FROM guardian`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const deleteGuardian = (request, response) => {
  client.query(
    "DELETE FROM guardian WHERE email = $1",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
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

const editBeaver = (request, response) => {
  const id = request.params.id;
  const [nameId, emailId] = id.split("-");
  const { grade, name } = request.body;

  client.query(
    "UPDATE beaver SET grade = $1, name = $2 WHERE name = $3 AND email = $4",
    [grade, name, nameId, emailId]
  );
};

module.exports = {
  getBeavers,
  createBeaver,
  getGuardian,
  deleteGuardian,
  editBeaver,
};
