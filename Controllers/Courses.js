import mongoose from "mongoose";
import Course from "../models/CourseModel"; // Import your Course model

const Course = mongoose.model("Course"); // Use the Course model

// Controller function to fetch a list of courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new course instance
    const newCourse = new Course({
      title,
      description,
    });

    // Save the new course to the database
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to fetch a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a course by ID
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description } = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true } // Return the updated course
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

