const {
  client,
  createTables,
  fetchUsers,
  fetchplaces,
  createUser,
  creatPlace,
  createVacation,
  fetchVacations,
  destroyVacations,
} = require("./db");

const express = require("express");
const app = express();

app.use(express.json);
app.use(require("morgan")("dev"));

// READ
app.get("/api/customers", async (req, res, next) => {
  try {
    res.send(await fetchCustomers());
  } catch (error) {
    next(error);
  }
});

app.get("/api/restraunts", async (req, res, next) => {
  try {
    res.send(await fetchRestraunts());
  } catch (error) {
    next(error);
  }
});

app.get("/api/restraunts", async (req, res, next) => {
  try {
    res.send(await fetchRestraunts());
  } catch (error) {
    next(error);
  }
});

app.get("/api/reservations", async (req, res, next) => {
  try {
    res.send(await fetchReservations());
  } catch (error) {
    next(error);
  }
});

// DELETE
app.delete(
  "/api/customers/:customer_id/restraunts/:id",
  async (req, res, next) => {
    try {
      await destroyRestraunt({
        customer_id: req.params.customer_id,
        id: req.params.id,
      });
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  }
);

// CREATE
app.post("/api/customers/:customer_id/restraunts", async (req, res, next) => {
  try {
    res.status(201).send(
      await createVacation({
        user_id: req.params.user_id,
        place_id: req.body.place_id,
        departure_date: req.body.departure_date,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

// init function
const init = async () => {
  await client.connect();
  console.log("connected to database");
  // table
  await createTables();
  console.log("tables are created");
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
