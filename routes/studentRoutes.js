const express = require('express');

const studentController = require("../controllers/studentController");

const studentRouter = express.Router();

studentRouter.post('/create-student', studentController.createStudent)
studentRouter.get('/get-students', studentController.getStudents);
studentRouter.get('/student/:id', studentController.getStudentById);
studentRouter.patch('/update-student/:id', studentController.updateStudent);
studentRouter.delete('/delete-student/:id', studentController.deleteStudent);

module.exports = studentRouter