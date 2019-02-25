const express = require("express");
const router = express.Router();
const knex = require("../db/dbconfig");
/* GET users listing. */
router.get("/", async function(req, res, next) {
  try {
    let students = await knex.select().table("students");
    console.log(students);

    res.render("students", { students: students });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
