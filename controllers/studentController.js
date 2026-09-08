const Student = require("../models/studentModel");
const bcrypt = require('bcryptjs');

class StudentController {

    // Create a new student
    async createStudent(req, res) {
        try {

            const { first_name, last_name, other_name, course, password } = req.body;



            if (!first_name || !last_name || !course || !password) {
                return res.status(400).json({
                    message: "All fields are required",
                    status: "error"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const student = await Student.create({
                first_name,
                last_name,
                other_name,
                course,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "Student created successfully",
                data: student,
                status: "success"
            });

        } catch (err) {

            return res.status(500).json({
                message: err.message,
                status: "error"
            });

        }
    }


    // Fetch all students
    async getStudents(req, res) {
        try {

            const students = await Student.find();

            return res.status(200).json({
                message: "All students fetched successfully",
                data: students,
                status: "success"
            });

        } catch (err) {

            return res.status(500).json({
                message: err.message,
                status: "error"
            });

        }
    }


    // Fetch single student
    async getStudentById(req, res) {
        try {

            const student = await Student.findById(req.params.id);

            if (!student) {
                return res.status(404).json({
                    message: "Student not found",
                    status: "error"
                });
            }

            return res.status(200).json({
                message: "Student fetched successfully",
                data: student,
                status: "success"
            });

        } catch (err) {

            return res.status(500).json({
                message: err.message,
                status: "error"
            });

        }
    }


    // Update student
    async updateStudent(req, res) {
        try {

            const {
                first_name,
                last_name,
                other_name,
                course,
                password
            } = req.body;

            const updateData = {
                first_name,
                last_name,
                other_name,
                course
            };

            if (password) {
                updateData.password = await bcrypt.hash(password, 12);
            }

            const student = await Student.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );

            if (!student) {
                return res.status(404).json({
                    message: "Student not found",
                    status: "error"
                });
            }

            return res.status(200).json({
                message: "Student updated successfully",
                data: student,
                status: "success"
            });

        } catch (err) {

            return res.status(500).json({
                message: err.message,
                status: "error"
            });

        }
    }


    // Delete student
    async deleteStudent(req, res) {
        try {

            const student = await Student.findByIdAndDelete(req.params.id);

            if (!student) {
                return res.status(404).json({
                    message: "Student not found",
                    status: "error"
                });
            }

            return res.status(200).json({
                message: "Student deleted successfully",
                status: "success"
            });

        } catch (err) {

            return res.status(500).json({
                message: err.message,
                status: "error"
            });

        }
    }

}

module.exports = new StudentController();