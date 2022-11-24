const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DB_URL,
});

client.connect();

const getQueryParam = (request, param) => request?.query?.[param] ?? null;

const OPERATORS = {
  equals: "=",
  notEquals: "!=",
};

const getBeavers = (request, response) => {
  const columns = getQueryParam(request, "columns") ?? "*";

  const column = getQueryParam(request, "column");
  const rawOperator = getQueryParam(request, "operator");
  const value = getQueryParam(request, "value");
  let whereClause = "";
  if (column && rawOperator && value) {
    const operator = OPERATORS[rawOperator];
    if (operator) {
      whereClause = `WHERE ${column} ${operator} '${value}'`;
    }
  }

  client.query(
    `SELECT ${columns} FROM beaver ${whereClause}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getBeaver = (request, response) => {
  const id = request.params.id;
  const [name, email] = id.split("-");

  client.query(
    `SELECT guardian.name as guardianName, phone_number, tail_color FROM beaver FULL JOIN guardian ON beaver.email = guardian.email FULL JOIN tailcolor ON beaver.grade = tailcolor.grade WHERE beaver.name = $1 AND beaver.email = $2 `,
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
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

const createBeaver = async (request, response) => {
  const { name, email, grade, phone, guardianName } = request.body;

  const existingGuardian = await client.query(
    "SELECT * FROM guardian WHERE email = $1",
    [email]
  );

  if (!existingGuardian) {
    client.query(
      createGuardianSQL,
      [email, guardianName, phone],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  }

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

const getGradeStatistics = (request, response) => {
  client.query(
    "SELECT grade, count(*) FROM beaver GROUP BY grade",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getOverworkedGuardians = (request, response) => {
  client.query(
    "SELECT guardian.name, count(beaver.name) as childCount FROM guardian FULL JOIN beaver ON guardian.email = beaver.email GROUP BY guardian.name HAVING count(beaver.name) > 1",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getGuardiansWithEagerBeavers = (request, response) => {
  // SELECT guardian.name, count(badge.name) as badge_count <-- get the guardian's name and the number of badges
  // FROM guardian
  // JOIN badge ON badge.name IN ( <-- join the badge table where the badge name is inside the nested query
  //    SELECT badge_name FROM beaverbadgeprogress <-- get the badge name from badge progress table
  //    WHERE
  //        beaverbadgeprogress.email = guardian.email <-- email matches guardian's
  //        AND date_completed IS NOT NULL <-- date completed exists (badge has been earned)
  // )
  // GROUP BY guardian.name
  client.query(
    "SELECT guardian.name, count(badge.name) as badge_count FROM guardian JOIN badge ON badge.name IN (SELECT badge_name FROM beaverbadgeprogress WHERE beaverbadgeprogress.email = guardian.email AND date_completed IS NOT NULL) GROUP BY guardian.name",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

getCompletionistBeavers = (request, response) => {
  client.query(
    "SELECT * FROM beaver WHERE NOT EXISTS (SELECT badge.name FROM badge WHERE NOT EXISTS (SELECT bbp.email FROM beaverbadgeprogress bbp WHERE bbp.badge_name = badge.name AND bbp.email = beaver.email AND bbp.beaver_name = beaver.name))",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getBeavers,
  getBeaver,
  createBeaver,
  getGuardian,
  deleteGuardian,
  editBeaver,
  getGradeStatistics,
  getOverworkedGuardians,
  getGuardiansWithEagerBeavers,
  getCompletionistBeavers,
};
