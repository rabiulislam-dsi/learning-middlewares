const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "anikDsi2676",
    database: "demo"
  }
});

module.exports = knex;
