// const { Admins } = require("../models/Admins");
// const express = require("express");
// const Router = express.Router();

// //get all admins
// Router.get("/", (req, res) => {
//   Admins.find()
//     .then((adm) => {
//       if (adm) {
//         res.status(200).send(adm);
//       } else {
//         res
//           .status(404)
//           .json({ success: false, message: "cannot get the admin" });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ success: false, error: err });
//     });
// });

// //Get admin by SSID
// Router.get("/:ssid_Hash", (req, res) => {
//   Admins.find(req.body.ssid_Hash)
//     .then((adm) => {
//       if (adm) {
//         res.status(200).send(adm);
//       } else {
//         res
//           .status(404)
//           .json({ success: false, message: "cannot find this ssid" });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ success: false, error: err });
//     });
// });

// //Add new admin to DB

// Router.post("/", (req, res) => {
//   const newAdmin = new Admins({
//     name: req.body.name,
//     ssid_Hash: req.body.ssid_Hash,
//     department: req.body.department,
//     password_hash: req.body.password_hash,
//   });
//   const ssidCheck = Admins.findOne(req.params.ssid_Hash);
//   if (ssidCheck) {
//     return res
//       .status(400)
//       .json({ success: false, message: "this ssid is already exists" });
//   }

//   // let departmentHelp;
//   // if (req.body.department === "IT") {
//   //   departmentHelp = "01";
//   // } else if (req.body.department === "CS") {
//   //   departmentHelp = "02";
//   // } else if (req.body.department === "IS") {
//   //   departmentHelp = "03";
//   // } else {
//   //   departmentHelp = "00";
//   // }
//   newAdmin
//     .save()
//     .then((adm) => {
//       if (adm) {
//         res
//           .status(200)
//           .json({ success: true, message: "Admin added successfully" });
//       } else {
//         res
//           .status(404)
//           .json({ success: false, message: "cannot add new admin" });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ success: false, error: err });
//     });
// });

// module.exports = Router;

const express = require("express");
const Router = express.Router();

const {
  addAdmin,
  getAllStudents,
  adminLogin,
  addStudent,
  addInstructor,
  getAllInstructor,
  getAllInstructorDepart,
  addSubject,
  getAllSubjects,
  getAllStudentbyDandY,
  getAllSubject,
  getAllAdmins,
} = require("../controler/AdminController");

Router.post("/addAdmin", addAdmin);
Router.post("/login", adminLogin);
Router.post("/addstd", addStudent);
Router.post("/addinst", addInstructor);
Router.post("/addsub", addSubject);
Router.get("/getAllInst", getAllInstructor);
Router.post("/getInstructorDepart", getAllInstructorDepart);
Router.get("/getStudents", getAllStudents);
Router.get("/getSubjects", getAllSubjects);
Router.get("/getAllStudentDepartYear", getAllStudentbyDandY);
Router.post("/getAllSubject", getAllSubject);
Router.get("/getAllAdmins", getAllAdmins);

module.exports = Router;
