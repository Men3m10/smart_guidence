const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
//////////////////////////////v alidation //////////////////////////////
const validateStudent = require("../validation/student_regester");
const validateAdminLogin = require("../validation/adminLogin");
const validateInstructor = require("../validation/instructorRegister");
const validateSubject = require("../validation/subjectRegister");
const validateAdminregerter = require("../validation/addingAdminValidation");
const validateInstructorDepart = require("../validation/getInstructorByDepart");
const validateStudentDepartYear = require("../validation/getStudentbydepartYear");
///////////////////////////// models //////////////////////////////////
const Admins = require("../models/Admins");
const Students = require("../models/Students");
const Subjects = require("../models/Subjects");
const Instructor = require("../models/Instructor");
//////////////////////////////////////////////////////////////

module.exports = {
  ///////////////////////////   ADD   ADMIN    //////////////////////////////////////////////////////
  addAdmin: async (req, res) => {
    try {
      const { name, password_hash, ssid_Hash, department } = req.body;
      const { errors, isValid } = validateAdminregerter(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const admin = await Admins.findOne({ ssid_Hash });
      if (admin) {
        return res
          .status(400)
          .json({ success: false, message: "National ID already exist" });
      }

      const newAdmin = await new Admins({
        name,
        password_hash: bcrypt.hashSync(password_hash),
        department,
        ssid_Hash,
      });
      await newAdmin.save();
      return res.status(200).json({
        success: true,
        message: "Admin registerd successfully",
        response: newAdmin,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////Get All Admins///////////////////////////////////////////////////////////
  getAllAdmins: async (req, res) => {
    try {
      const Admin = await Admins.find().select("-password_hash");
      if (Admin.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No Admins found" });
      }
      res.status(200).json({
        success: true,
        message: "Enrolled successfully",
        response: Admin,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting all Admins", ${err.message}` });
    }
  },
  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////// ADMIN LOGIN   //////////////////////////////////////////////////////

  adminLogin: async (req, res) => {
    try {
      const { errors, isValid } = validateAdminLogin(req.body);

      //check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { ssid_Hash, password_hash } = req.body;
      const admin = await Admins.findOne({ ssid_Hash });
      if (!admin) {
        errors.ssid_Hash = "SSID number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(
        password_hash,
        admin.password_hash
      );
      if (!isCorrect) {
        errors.password_hash = "Invalid Password";
        return res.status(404).json(errors);
      }
      const payload = {
        id: admin.id,
        name: admin.name,
        department: admin.department,
      };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } catch (err) {
      console.log("Error in admin login", err.message);
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////   ADD STUDENT    ///////////////////////////////////////////////

  addStudent: async (req, res) => {
    try {
      const { errors, isValid } = validateStudent(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const {
        name,
        year,
        uni_email,
        phone,
        address,
        department,
        division,
        preference,
        gender,
        code_Hash,
        ssid_Hash,
        section,
      } = req.body;
      const student = await Students.findOne({
        ssid_Hash,
      });
      if (student) {
        return res
          .status(400)
          .json({ success: false, message: "National ID already exist" });
      }

      const newStudent = await new Students({
        name,
        year,
        uni_email,
        phone,
        address,
        department,
        division,
        preference,
        gender,
        code_Hash,
        ssid_Hash,
        section,
      });
      await newStudent.save();
      const subjects = await Subjects.find({ department, year });
      if (subjects.length !== 0) {
        for (var i = 0; i < subjects.length; i++) {
          newStudent.subjects.push(subjects[i]._id);
        }
      }
      await newStudent.save();
      return res.status(200).json({
        success: true,
        message: "student registerd successfully",
        response: newStudent,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////   GET ALL STUDENTS   /////////////////////////////////////////////////

  getAllStudents: async (req, res) => {
    try {
      const student = await Students.find({});
      if (student.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No students found" });
      }
      res.status(200).json({
        success: true,
        message: "Enrolled successfully",
        response: student,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting all student", ${err.message}` });
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////// add Instructor //////////////////////////////////////////////////
  addInstructor: async (req, res) => {
    try {
      const { name, password, gender, department, ssid_Hash } = req.body;
      const { errors, isValid } = validateInstructor(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const instructor = await Instructor.findOne({ ssid_Hash });
      if (instructor) {
        return res
          .status(400)
          .json({ success: false, message: "national id already exist" });
      }

      const newInstructor = await new Instructor({
        name,
        password: bcrypt.hashSync(password),
        gender,
        department,
        ssid_Hash,
      });
      await newInstructor.save();
      return res.status(200).json({
        success: true,
        message: "Instructor registerd successfully",
        response: newInstructor,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// get all instructor //////////////////////////////////
  getAllInstructor: async (req, res) => {
    try {
      const instructors = await Instructor.find({});
      if (instructors.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ result: instructors });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting new instructor", ${err.message}` });
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// Add Subject ////////////////////////////////////////////
  addSubject: async (req, res) => {
    try {
      const { errors, isValid } = validateSubject(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { totalLectures, department, subjectCode, subjectName, year } =
        req.body;
      const subject = await Subjects.findOne({ subjectCode });
      if (subject) {
        return res
          .status(400)
          .json({ success: false, message: "Given subject already added" });
      }
      const newSubject = await new Subjects({
        totalLectures,
        department,
        subjectCode,
        subjectName,
        year,
      });
      // const students = await Students.find({ department, year });
      // if (students.length === 0) {
      //   errors.department = "No branch found for given subject";
      //   return res.status(400).json(errors);
      // } else {
      //   for (var i = 0; i < students.length; i++) {
      //     students[i].subjects.push(newSubject._id);
      //     await students[i].save();
      //   }

      // }
      await newSubject.save();
      return res.status(200).json({
        success: true,
        message: "subject added successfully",
        response: newSubject,
      });
    } catch (err) {
      console.log(`error in adding new subject", ${err.message}`);
    }
  },

  ////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////// get all subjects /////////////////////////////////////////
  getAllSubjects: async (req, res) => {
    try {
      const allSubjects = await Subjects.find({});
      if (!allSubjects) {
        return res
          .status(404)
          .json({ message: "You havent registered any subject yet." });
      }
      res.status(200).json({
        success: true,
        message: "done",
        response: allSubjects,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting all Subjects", ${err.message}` });
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// get all instructors ///////////////////////////////////

  getAllInstructorDepart: async (req, res, next) => {
    try {
      const { errors, isValid } = validateInstructorDepart(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { department } = req.body;
      const allInstructors = await Instructor.find({ department });
      if (allInstructors.length == 0) {
        return res
          .status(404)
          .json({ message: "cannot find instructors in this department." });
      }
      res.status(200).json({
        success: true,
        message: "Enrolled successfully",
        response: allInstructors,
      });
    } catch (err) {
      console.log("Error in gettting all Instructor", err.message);
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////
  getAllStudentbyDandY: async (req, res, next) => {
    try {
      const { errors, isValid } = validateStudentDepartYear(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { department, year } = req.body;
      const allStudents = await Students.find({ department, year });
      if (allStudents.length == 0) {
        return res.status(404).json({
          message:
            "cannot find a student in this department and this year together.",
        });
      }
      res.status(200).json({ result: allStudents });
    } catch (err) {
      console.log("Error in gettting all students", err.message);
    }
  },
  ///////////////////////////////////////////////////////////////////////////////////

  getAllSubject: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const allSubjects = await Subjects.find({ department, year });
      if (allSubjects.length == 0) {
        return res.status(404).json({
          success: false,
          message:
            "cannot find a subject in this department and this year together.",
        });
      }
      res.status(200).json({
        success: true,
        message: "All subjects in this given data",
        response: allSubjects,
      });
    } catch (err) {
      console.log("Error in gettting all students", err.message);
    }
  },
};
