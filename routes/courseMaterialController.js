import Course from './CourseModel.js'
import Fuse from 'fuse.js';

//adding Course Name and Code to DB : POST REQ
export const addCourse = async (req, res) => {
    try {
        const { course_name, course_code , Folder } = req.body;
        if(!course_name || !course_code || !Folder) 
        return res.status(400).json({ error: 'Please enter all the fields' });

        // Check if the course with the same code already exists
        const existingCourse = await Course.findOne({ course_code });
        if (existingCourse) {
            return res.status(400).json({ error: 'Course with the same code already exists' });
        }

        // Create a new course
        const newCourse = new Course({ course_name, course_code , Folder });
        await newCourse.save();

        res.json({ message: 'Course added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}; 



// Endpoint to delete course:
export const deleteCourse = async (req, res) => {
  const { course_code } = req.params;
  try {
    // Delete the course
    const deletedCourse = await Course.findOneAndDelete({ course_code });

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course, units, and associated materials deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting course.', error: error.message });
  }
};


//Get all the courses from the DB : GET REQ

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const getCourseByCode = async (req, res) => {
  try {
    const courses = await Course.find({ course_code: req.params.course_code});
    res.json(courses);
} catch (error) {
    res.status(500).json({ error: 'Server error' });
}
}

// Search for a course by course code or course name


export const searchCourse = async (req, res) => {
  const { searchQuery } = req.params;
  try {
    const options = {
      keys: ["course_name", "course_code"], // Add the relevant fields to search
      includeScore: true,
      threshold: 0.4,
    };

    // Fetch only the necessary fields
    const courses = await Course.find({}, "course_name course_code");

    // Create an index
    const index = Fuse.createIndex(options.keys, courses);

    // Use the index for searching
    const fuse = new Fuse(courses, options, index);
    const result = fuse.search(searchQuery); // Use searchQuery instead of query
    const matchedCourses = result.map(({ item }) => item);

    res.json(matchedCourses);

  } catch (error) {
    return res.status(500).json({ message: 'Error searching for course.', error: error.message });
  }
};