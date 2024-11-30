const express = require('express');
const { getAllStudent, getStudentById, createStudent, updateStudent, deleteStudent} = require('../controllers/studentControllers');

const router =  express.Router();

router.get('/', getAllStudent);
router.get('/:student_id', getStudentById);
router.post('/', createStudent);
router.put('/:student_id', updateStudent);
router.delete('/:student_id', deleteStudent);

module.exports = router;