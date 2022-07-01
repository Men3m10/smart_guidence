// // //const { Students } = require("../models/Students");
// const express = require("express");
// const Router = express.Router();
// const mongoose = require("mongoose");

// // // get all students
// // Router.get(`/`, (req, res) => {
// //   Students.find()
// //     .then((std) => {
// //       if (std) {
// //         return res.status(200).send(std);
// //       } else {
// //         res
// //           .status(404)
// //           .json({ sucess: false, message: "cannot get the students" });
// //       }
// //     })
// //     .catch((err) => {
// //       return res.status(400).json({ sucess: false, error: err });
// //     });
// // });

// // // //get one student by id
// // Router.get(`/:id`, (req, res) => {
// //   if (!mongoose.isValidObjectId(req.params.id)) {
// //     return res.status(400).send("invalid id");
// //   }
// //   Students.findById(req.params.id)
// //     .then((std) => {
// //       if (std) {
// //         return res.status(200).send(std);
// //       } else {
// //         res
// //           .status(404)
// //           .json({ sucess: false, message: "cannot find the student" });
// //       }
// //     })
// //     .catch((err) => {
// //       return res.status(400).json({ sucess: false, error: err });
// //     });
// //   // if (!student) {
// //   //   return res.status(500).json({ sucess: false });
// //   // }
// //   // res.send(student);
// // });

// // //post A new student
// // // Router.post(`/`, (req, res) => {
// // //   const newStudent = new Students({
// // //     name: req.body.name,
// // //     academic_year: req.body.academic_year,
// // //     uni_email: req.body.uni_email,
// // //     phone: req.body.phone,
// // //     address: req.body.address,
// // //     fav: req.body.fav,
// // //     GPA: req.body.GPA,
// // //     elsho3ba: req.body.elsho3ba,
// // //     sex: req.body.sex,
// // //     code_Hash: req.body.code_Hash,
// // //     ssid_Hash: req.body.ssid_Hash,
// // //   });
// // //   newStudent
// // //     .save()
// // //     .then((std) => {
// // //       if (std) {
// // //         return res
// // //           .status(200)
// // //           .json({ sucess: true, message: "student added succesfully" });
// // //       } else {
// // //         res
// // //           .status(404)
// // //           .json({ sucess: false, message: "cannot add the student" });
// // //       }
// // //     })
// // //     .catch((err) => {
// // //       return res.status(400).json({ sucess: false, error: err });
// // //     });

// // // try {
// // //   const Student = await newStudent.save();
// // //   res.status(200).json(Student);
// // // } catch (err) {
// // //   res.status(500).json(err);
// // // }
// // // });

// // //update student data by id
// // Router.put("/:id", (req, res) => {
// //   if (!mongoose.isValidObjectId(req.params.id)) {
// //     return res.status(400).send("invalid id");
// //   }
// //   Students.findByIdAndUpdate(
// //     req.params.id,
// //     {
// //       name: req.body.name,
// //       academic_year: req.body.academic_year,
// //       uni_email: req.body.uni_email,
// //       phone: req.body.phone,
// //       address: req.body.address,
// //       fav: req.body.fav,
// //       GPA: req.body.GPA,
// //       elsho3ba: req.body.elsho3ba,
// //       sex: req.body.sex,
// //       code_Hash: req.body.code_Hash,
// //       ssid_Hash: req.body.ssid_Hash,
// //       isFyear: req.body.isFyear,
// //       date_chosen: req.body.date_chosen,
// //       time_chosen: req.body.time_chosen,
// //     },
// //     { new: true }
// //   )
// //     .then((std) => {
// //       if (std) {
// //         return res
// //           .status(200)
// //           .json({ sucess: true, message: "student updated succesfully" });
// //       } else {
// //         res
// //           .status(404)
// //           .json({ sucess: false, message: "cannot find the student" });
// //       }
// //     })
// //     .catch((err) => {
// //       return res.status(400).json({ sucess: false, error: err });
// //     });

// //   //************async and await way************ */
// //   // try {
// //   //   const student = await Students.findByIdAndUpdate(req.params.id, {
// //   //     name: req.body.name,
// //   //     academic_year: req.body.academic_year,
// //   //     uni_email: req.body.uni_email,
// //   //     phone: req.body.phone,
// //   //     address: req.body.address,
// //   //     fav: req.body.fav,
// //   //     GPA: req.body.GPA,
// //   //     elsho3ba: req.body.elsho3ba,
// //   //     sex: req.body.sex,
// //   //     code_Hash: req.body.code_Hash,
// //   //     ssid_Hash: req.body.ssid_Hash,
// //   //     isFyear: req.body.isFyear,
// //   //     date_chosen: req.body.date_chosen,
// //   //     time_chosen: req.body.time_chosen,
// //   //   },{new:true});
// //   //   res.status(200).json(student);
// //   // } catch (err) {
// //   //   res.status(500).json(err);
// //   // }
// //   //************************************************** */
// // });

// // //Remove a student
// // Router.delete("/:id", (req, res) => {
// //   if (!mongoose.isValidObjectId(req.params.id)) {
// //     return res.status(400).send("invalid id");
// //   }
// //   Students.findByIdAndRemove(req.params.id)
// //     .then((std) => {
// //       if (std) {
// //         return res
// //           .status(200)
// //           .json({ sucess: true, message: "student deleted succesfully" });
// //       } else {
// //         res
// //           .status(404)
// //           .json({ sucess: false, message: "cannot find the student" });
// //       }
// //     })
// //     .catch((err) => {
// //       return res.status(400).json({ sucess: false, error: err });
// //     });
// // });

// // //get syudents in first year

// // // Router.get("/get/firstyear", (req, res) => {
// // //   Students.find({ isFyear: true })
// // //     .then((std) => {
// // //       if (std) {
// // //         return res.status(200).send(std);
// // //       } else {
// // //         res.status(404).json({ message: "cannot find any student" });
// // //       }
// // //     })
// // //     .catch((err) => {
// // //       return res.status(400).json({ sucess: false, error: err });
// // //     });
// // // });

// module.exports = Router;

const express = require("express");
const Router = express.Router();

const {
  studentLogin,
  getAllStudents,
  getStudentByName,
  getStudentSSID,
  getAllSubjects,
  getMarks,
  checkAttendence,
} = require("../controler/studentController");

Router.post("/studentLogin", studentLogin);
Router.post("/getAllStudents", getAllStudents);
Router.post("/getStudentByName", getStudentByName);
Router.post("/getStudentSSID", getStudentSSID);
Router.get("/getAllSubjects", getAllSubjects);
Router.get("/getMarks", getMarks);
Router.get("/checkAttendence", checkAttendence);

module.exports = Router;
