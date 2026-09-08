const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
      first_name: {
            type: String,
            required: [true, "First name is required"]
      },
      last_name: {
            type: String,
            required: [true, "Last name is required"]
      },
      other_name: {
            type: String,
            required: false
      },
      course: {
            type: String,
            required: [true, "Course is required"]
      },
      password: {
            type: String,
            required: [true, "Password is required"],
            select: false
      }

}, {
      timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
      }
}
)

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;