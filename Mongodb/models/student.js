import { Schema } from "mongoose";
import { model } from "mongoose";

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    grade: { type: String, required: true }
});

const Student = model('Student', studentSchema);

export default Student;