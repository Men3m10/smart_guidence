const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv/config");
const api = process.env.API_URL;
const connection = process.env.CONNECTION;

app.use(cors());
app.options("*", cors());

//////////////////////////++++++++++++++++models++++++++++++++++++/////////////////////////////////////////////////////////
const studentsRouter = require("./routers/Students");
const adminsRouter = require("./routers/Admins");
const subjectsRouter = require("./routers/subjects");
const attendenceSchema = require("./models/attendence");
const instructorRouter = require("./routers/Instructor");
const markSchema = require("./models/marks");
/////////////////////////////////////////////////////////////////////////////////////

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(`${api}/student_info`, studentsRouter);
app.use(`${api}/admins_info`, adminsRouter);
app.use(`${api}/instructor_info`, instructorRouter);

////////////////////////////////////////////////////////////////////////////////////

//dbconnection
mongoose
  .connect(connection)
  .then(() => {
    console.log("database connected succefully");
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////////////////////////////////////////////////////////////////////

app.listen(8000, () => {
  console.log("server is connected");
});

// var server = app.listen(process.env.PORT || 8000, () => {
//   var port = server.address().port;
//   console.log(" connected  " + port);
// });
