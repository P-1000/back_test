import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  course_code: { type: String, required: true },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
