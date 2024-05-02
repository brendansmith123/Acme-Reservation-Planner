const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_reservation_planner"
);

const createTables = async () => {
  const SQL = `--sql
  DROP TABLE IF EXISTS customers;
        DROP TABLE IF EXISTS restraunts;
        DROP TABLE IF EXISTS reservations;
        CREATE TABLE customers(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE restraunts(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE reservations(
            id UUID PRIMARY KEY,
            reservation_date DATE NOT NULL,
            party_count INTEGER NOT NULL,
            customer_id UUID REFERENCES customers(id) NOT NULL,
            restraunt_id UUID REFERENCES restraunts(id) NOT NULL
        );
    `;
  await client.query(SQL);
};

const createCustomer = async (name) => {
  const SQL = `
      INSERT INTO customers(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

module.exports = {
  client,
  createTables,
  // fetchUsers,
  // fetchplaces,
  // createUser,
  // creatPlace,
  // createVacation,
  // fetchVacations,
  // destroyVacations,
};
