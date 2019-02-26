const express = require("express");
const router = express.Router();
const knex = require("../db/dbconfig");
const createError = require("http-errors");
/* GET users listing. */
router.get("/", async function(req, res, next) {
  try {
    let students = await knex.select().table("students");
    // console.log(students);
    res.render("students", { students: students });
  } catch (err) {
    next(createError(500, err));
  }
});

router.post("/addnew", async function(req, res, next) {
  let newStudent = {
    student_name: req.body.name,
    student_grade: req.body.grade,
    student_age: req.body.age,
    student_image_path: req.body.image
  };
  knex("students")
    .insert(newStudent)
    .then(function(affectedRows) {
      return knex.select().table("students");
    })
    .then(function(students) {
      res.render("students", { students: students });
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

module.exports = router;
