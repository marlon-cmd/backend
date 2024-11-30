const express = require('express');
const { getAllCourse, getCourseById, createCourse, updateCourse, deleteCourse} = require('../controllers/courseControllers');

const router =  express.Router();

router.get('/', getAllCourse);
router.get('/:course_id', getCourseById);
router.post('/', createCourse);
router.put('/:course_id', updateCourse);
router.delete('/:course_id', deleteCourse);

module.exports = router;