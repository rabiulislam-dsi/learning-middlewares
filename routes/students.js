const express = require("express");
const router = express.Router();
const knex = require("../db/dbconfig");
/* GET users listing. */
router.get("/", async function(req, res, next) {
  try {
    let students = await knex.select().table("students");
    // console.log(students);
    res.render("students", { students: students });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addnew", async function(req, res, next) {
  res.status(500).send({ success: false });
  // let newStudent = {
  //   student_name: req.body.name,
  //   student_grade: req.body.grade,
  //   student_age: req.body.age,
  //   student_image_path: req.body.image
  // };
  // knex("students")
  //   .insert(newStudent)
  //   .then(function(affectedRows) {
  //     return knex.select().table("students");
  //   })
  //   .then(function(students) {
  //     res.render("students", { students: students });
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
});

module.exports = router;
