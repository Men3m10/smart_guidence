const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
////////////////////////////////////////////////////////////////////////////////////
const Student = require("../models/Students");
const Subject = require("../models/Subjects");
const Mark = require("../models/marks");
const Attendence = require("../models/attendence");
/////////////////////////////////////////////////////////////////////////////////////

const validateStudentLogin = require("../validation/studentLogin");

////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  studentLogin: async (req, res, next) => {
    const { errors, isValid } = validateStudentLogin(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { code_Hash, ssid_Hash } = req.body;

    const student = await Student.findOne({ ssid_Hash });
    if (!student) {
      errors.ssid_Hash = "SSID number not found";
      return res.status(404).json(errors);
    }
    // const isCorrect = await bcrypt.compare(password, student.password);
    // if (!isCorrect) {
    //   errors.password = "Invalid Credentials";
    //   return res.status(404).json(errors);
    // }
    const payload = { id: student.id, student };
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    });
  },
  checkAttendence: async (req, res, next) => {
    try {
      const { studentId } = req.body;
      const attendence = await Attendence.find({ student: studentId }).populate(
        "subject"
      );
      if (!attendence) {
        res.status(400).json({ message: "Attendence not found" });
      }
      res.status(200).json({
        result: attendence.map((att) => {
          let res = {};
          res.attendence = (
            (att.lectureAttended / att.totalLecturesByinstructor) *
            100
          ).toFixed(2);
          res.subjectCode = att.subject.subjectCode;
          res.subjectName = att.subject.subjectName;
          res.maxHours = att.subject.totalLectures;
          res.absentHours = att.totalLecturesByinstructor - att.lectureAttended;
          res.lectureAttended = att.lectureAttended;
          res.totalLecturesByinstructor = att.totalLecturesByinstructor;
          return res;
        }),
      });
    } catch (err) {
      console.log("Error in fetching attendence", err.message);
    }
  },
  getAllStudents: async (req, res, next) => {
    try {
      const { department, year, section } = req.body;
      const students = await Student.find({ department, year, section });
      if (students.length === 0) {
        return res.status(400).json({ message: "No student found" });
      }
      return res.status(200).json({ result: students });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  getStudentByName: async (req, res, next) => {
    try {
      const { name } = req.body;
      const students = await Student.find({ name });
      if (students.length === 0) {
        return res.status(400).json({ message: "No student found" });
      }
      return res.status(200).json({ result: students });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  getStudentSSID: async (req, res, next) => {
    try {
      const { ssid_Hash } = req.body;
      const students = await Student.findOne({ ssid_Hash });
      if (!students) {
        return res.status(400).json({ message: "No student found" });
      }
      return res.status(200).json({ result: students });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  getAllSubjects: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const subjects = await Subject.find({ department, year });
      if (subjects.length === 0) {
        return res.status(404).json({ message: "No subjects founds" });
      }
      res.status(200).json({ result: subjects });
    } catch (err) {
      return res
        .status(400)
        .json({ "Error in getting all subjects": err.message });
    }
  },
  getMarks: async (req, res, next) => {
    try {
      const { department, year, id } = req.body;
      const getMarks = await Mark.find({ department, student: id }).populate(
        "subject"
      );
      console.log("getMarks", getMarks);

      const Orale = getMarks.filter((obj) => {
        return obj.exam === "Orale";
      });
      const Practical = getMarks.filter((obj) => {
        return obj.exam === "Practical";
      });
      const Activities = getMarks.filter((obj) => {
        return obj.exam === "Activities";
      });
      const Finalexam = getMarks.filter((obj) => {
        return obj.exam === "Finalexam";
      });
      res.status(200).json({
        result: {
          Orale,
          Practical,
          Activities,
        },
      });
    } catch (err) {
      return res.status(400).json({ "Error in getting marks": err.message });
    }
  },
};
