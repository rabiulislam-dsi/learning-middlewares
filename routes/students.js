const express = require("express");
const router = express.Router();
const knex = require("../db/dbconfig");
const createError = require("http-errors");
var multer = require("multer");
var upload = multer({ dest: "public/images/uploads/" });
/* GET users listing. */
router.get("/getall", async function(req, res, next) {
  knex("students")
    .orderBy("student_id", "desc")
    .then(function(students) {
      console.log(students);
      res.render("students", { students: students });
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

router.get("/addnew", async function(req, res, next) {
  res.render("newstudent");
});

router.post("/addnew", upload.single("image"), async function(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  let newStudent = {
    student_name: req.body.name,
    student_grade: req.body.grade,
    student_age: req.body.age,
    student_image_path: req.file ? req.file.filename : "default.jpg"
  };
  knex("students")
    .insert(newStudent)
    .then(function(affectedRows) {
      res.redirect("/students/getall");
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

router.get("/edit/:id", async function(req, res, next) {
  knex("students")
    .where("student_id", req.params.id)
    .then(function(students) {
      console.log(students);
      if (students.length > 0) {
        res.render("editstudent", { student: students[0] });
      } else {
        next(createError(404, "Data Not Found"));
      }
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

router.post("/edit/:id", upload.single("image"), async function(
  req,
  res,
  next
) {
  let updatedStudent = {
    student_name: req.body.name,
    student_grade: req.body.grade,
    student_age: req.body.age,
    student_image_path: req.file ? req.file.filename : "default.jpg"
  };

  knex("students")
    .where("student_id", req.params.id)
    .then(function(students) {
      console.log(students);
      if (students.length > 0) {
        knex("students")
          .where("student_id", req.params.id)
          .update(updatedStudent)
          .then(function(affectedRows) {
            res.redirect("/students/getall");
          });
      } else {
        next(createError(404, "Data Not Found"));
      }
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

router.get("/delete/:id", async function(req, res, next) {
  knex("students")
    .where("student_id", req.params.id)
    .del()
    .then(function(students) {
      res.redirect("/students/getall");
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

router.get("/details/:id", async function(req, res, next) {
  knex("students")
    .where("student_id", req.params.id)
    .then(function(students) {
      res.render("studentdetails", { student: students[0] });
    })
    .catch(function(err) {
      next(createError(500, err));
    });
});

module.exports = router;
