import express from 'express';
import { 
    addCourse , 
    getAllCourses, 
    deleteCourse,
    searchCourse,
    getCourseByCode
            } from '../controllers/courseMaterialController.js';

const router = express.Router();

router.post('/addCourse', addCourse);  // add course name and code to db 

router.get('/getAllCourses' , getAllCourses); // get all courses in db : 

router.delete('/deleteCourse/:course_code' , deleteCourse); // delete course from db :

router.get('/searchcourse/:searchQuery' , searchCourse); // search course from db :

router.get('/getCourseByCode/:course_code' , getCourseByCode); // get course by course code :


export default router;
